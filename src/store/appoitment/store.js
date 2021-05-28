import {action, observable, toJS} from 'mobx';
import _ from 'lodash';
import {APPOINTMENT} from './constants';
import {AppointmentsStore} from "./index";

class AppointmentStore {
    @observable appointments = APPOINTMENT;

    constructor() {
        this.init()
    }

    @action init() {
        this.appointments = JSON.parse(localStorage.getItem('appointments')) || APPOINTMENT
    }

    getAppointments(userId) {
        return _.filter(this.appointments, (appointment) => {
            return appointment.user === userId
        })
    }

    getAppointmentsBySeller(sellerId){
       return  _.filter(this.appointments, (appointment) => appointment.seller === sellerId);
    }

    @action addNewAppointment(appointmentData) {
        this.appointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(this.appointments));
        this.appointments = JSON.parse(localStorage.getItem('appointments'))
    }

    @action updateAppointment(appointmentId) {
        this.appointments = _.filter(this.appointments, (appointment) => appointment.id !== appointmentId)
        localStorage.setItem('appointments', JSON.stringify(this.appointments))
    }

    @action acceptAppointment(appointmentId) {
        _.forEach(this.appointments, (appointment) => {
            if (appointment.id === appointmentId)
                appointment.status = 'approved'
        })

        localStorage.setItem('appointments', JSON.stringify(this.appointments))
    }
}

export default new AppointmentStore();