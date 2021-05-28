import {observable} from 'mobx';
import {CATEGORIES} from './constants';

class CategoriesStore {
    @observable categories = CATEGORIES;

    constructor() {
        this.categories = CATEGORIES
    }


}

export default new CategoriesStore();