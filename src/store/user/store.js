import { action, computed, observable, observe } from 'mobx';
import _ from 'lodash';

class UserStore {
    @observable isLoggedIn = false;

    @observable user;

    constructor(){
        this.isLoggedIn = !!localStorage.getItem('userId')
    }


    @action login(user){
        this.user = user;
    }



}
export default new UserStore();