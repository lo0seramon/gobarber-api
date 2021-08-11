import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe('CreateAppointment', () => {
    it('should be able to create an appointment', async () => {
       const fakeAppointmentsRepository = new FakeAppointmentsRepository();
       const createAppointment = new CreateAppointmentService(
         fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
          date: new Date(),
          provider_id: '13424324'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('13424324');
    });

    it('should not be able to create two appointments on same time', async () => {
       const fakeAppointmentsRepository = new FakeAppointmentsRepository();
       const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

       const appointmentDate = new Date();

       const appointment = await createAppointment.execute({
         date: appointmentDate ,
         provider_id: '218965'
       });

       expect(createAppointment.execute({
        date: appointmentDate ,
        provider_id: '218965'
      })).rejects.toBeInstanceOf(AppError);
    });
});
