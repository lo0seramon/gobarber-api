import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppoinitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppoinitmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

    return findAppointment;
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {id: uuid(), provider_id, date});

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
