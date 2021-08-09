import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface Request {
  provider_id: string,
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameHour = await appointmentRepository.findByDate(appointmentDate);

    console.log(findAppointmentInSameHour);

    if(findAppointmentInSameHour) {
      throw new AppError('Cannot book an appointment on this date!');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
