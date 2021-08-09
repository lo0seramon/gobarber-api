import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppoinitmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
