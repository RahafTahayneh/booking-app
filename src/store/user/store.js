import {action, observable} from 'mobx';

class UserStore {
    @observable isLoggedIn = false;

    @observable user;

    constructor() {
        this.isLoggedIn = !!localStorage.getItem('userId');
        this.user = localStorage.getItem('userId')
    }


    @action login(user) {
        this.user = user;
    }


}

export default new UserStore();