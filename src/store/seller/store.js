import { action, computed, observable, observe } from 'mobx';
import _ from 'lodash';
import { SELLERS } from './constants'
import { UserStore } from '../user';

class SellerStore {
    @observable sellers;
    
    constructer(){
        if(!localStorage.getItem("sellers"))
            this.sellers = SELLERS
        else {
            this.sellers = JSON.parse(localStorage.getItem("sellers"))
        }
    }

    @action authoraizeSeller(data){
        const isExist = _.find(this.sellers, (seller) => seller.email === data.email && seller.password === data.password );
        if(isExist){
            const index = _.findIndex(this.sellers, (seller) => seller.email === data.email && seller.password === data.password );
            localStorage.setItem('userId', this.sellers[index].id )
            localStorage.setItem('type', 'seller')
            UserStore.login(this.sellers[index]);
        }
           
        return isExist;
    }

    @action registerNewSeller(data, category){
        data.category = category;
        this.sellers.push(data);
        localStorage.setItem('userId', data.id )
        localStorage.setItem('type', 'seller')
        localStorage.setItem('sellers', JSON.stringify(this.sellers))
        this.sellers = JSON.parse(localStorage.getItem("sellers"))
        console.log(this.sellers)
    }

}
export default new SellerStore();