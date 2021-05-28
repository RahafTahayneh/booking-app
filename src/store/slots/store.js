import {action, observable} from 'mobx';
import _ from 'lodash';
import {SLOTS} from './constants';

class SlotsStore {
    @observable slots = SLOTS;

    constructor() {
        this.slots = JSON.parse(localStorage.getItem('slots')) || SLOTS
    }

    @action init() {
        this.slots = JSON.parse(localStorage.getItem('slots')) || SLOTS
    }

    getAvailableSlotsPerSeller(sellerId) {
        return _.filter(this.slots, (slot) => {
            return slot.seller === sellerId && slot.status === 'available'
        })
    }

    getReservedSlotsPerSeller(sellerId) {
        return _.filter(this.slots, (slot) => {
            return slot.seller === sellerId && slot.status === 'reserved'
        })
    }

    @action updateSlots(slotId, status) {
        _.forEach(this.slots, (slot) => {
            if (slotId === slot.id) {
                slot.status = status
            }
        })
        localStorage.setItem('slots', JSON.stringify(this.slots))
    }

    @action addNewSlot(slotData) {
        this.slots.push(slotData)
        localStorage.setItem('slots', JSON.stringify(this.slots))
    }

    @action updateSlot(slotId, date) {
        const slot = _.find(this.slots, {id: slotId});
        slot.data = date;
        localStorage.setItem('slots', JSON.stringify(this.slots))
    }

    @action deleteSlot(slotId) {
        this.slots = _.filter(this.slots, slot => slot.id !== slotId);
        localStorage.setItem('slots', JSON.stringify(this.slots))
    }


}

export default new SlotsStore();