import { startOfHour } from 'date-fns'

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

interface IRequest {
  provider_id: string,
  date: Date
}

class CreateAppointmentService {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameHour = await this.appointmentRepository.findByDate(appointmentDate);

    console.log(findAppointmentInSameHour);

    if(findAppointmentInSameHour) {
      throw new AppError('Cannot book an appointment on this date!');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
