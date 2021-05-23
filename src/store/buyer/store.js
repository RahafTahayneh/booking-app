import { action, computed, observable, observe } from 'mobx';
import _ from 'lodash';
import { Buyers } from './constants'
import { UserStore } from '../user';

class BuyerStore {
    @observable buyers = Buyers;

    @action authoraizeBuyer(data){
        const isExist = _.find(this.buyers, (buyer) => buyer.email === data.email && buyer.password === data.password );
        if(isExist){
            const index = _.findIndex(this.buyers, (buyer) => buyer.email === data.email && buyer.password === data.password );
            localStorage.setItem('userId', this.buyers[index].id )
            localStorage.setItem('type', 'buyer')
            UserStore.login(this.buyers[index]);
        }
           
        return isExist;
    }

    @action registerNewBuyer(data){
        this.buyers.push(data);
        localStorage.setItem('userId', data.id )
        localStorage.setItem('type', 'seller')
        localStorage.setItem('buyers', JSON.stringify(this.buyers))
        this.buyers = JSON.parse(localStorage.getItem("buyers"))
    }

}
export default new BuyerStore();