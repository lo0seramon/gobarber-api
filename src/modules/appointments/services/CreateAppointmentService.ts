import { startOfHour } from 'date-fns'
import {injectable, inject} from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppoinitmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string,
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppoinitmentsRepository
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameHour = await this.appointmentRepository.findByDate(appointmentDate);

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
