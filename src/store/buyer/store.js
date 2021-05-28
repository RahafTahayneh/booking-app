import { action, computed, observable, observe } from 'mobx';
import _ from 'lodash';
import { Buyers } from './constants'
import { UserStore } from '../user';

class BuyerStore {
    @observable buyers = Buyers;

    constructor() {
        this.buyers = JSON.parse(localStorage.getItem('buyers')) || Buyers
    }

    @action authoraizeBuyer(data){
        const isExist = _.find(this.buyers, (buyer) => buyer.email === data.email && buyer.password === data.password );
        if(isExist){
            const index = _.findIndex(this.buyers, (buyer) => buyer.email === data.email && buyer.password === data.password );
            localStorage.setItem('userId', this.buyers[index].id )
            localStorage.setItem('type', 'buyer');
            UserStore.isLoggedIn = true;
            UserStore.login(this.buyers[index]);
        }
           
        return isExist;
    }

    @action registerNewBuyer(data){
        this.buyers.push(data);
        localStorage.setItem('userId', data.id )
        localStorage.setItem('type', 'buyer')
        localStorage.setItem('buyers', JSON.stringify(this.buyers))
        UserStore.isLoggedIn = true;
        this.buyers = JSON.parse(localStorage.getItem("buyers"))
    }

}
export default new BuyerStore();