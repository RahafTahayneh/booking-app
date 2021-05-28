import {action, observable, when} from 'mobx';
import {UserStore} from "../user";

class LayoutStore {
    @observable sidebarVisible = false;

    constructor() {
        when(()=> UserStore.isLoggedIn, ()=> {
            this.sidebarVisible = true
        })
    }

    @action showSidebar() {
        this.sidebarVisible = true;
    }

    @action hideSidebar() {
        this.sidebarVisible = false;
    }

}

export default new LayoutStore();
