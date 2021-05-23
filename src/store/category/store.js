import { action, computed, observable, observe } from 'mobx';
import _ from 'lodash';
import { CATEGORIES } from './constants';

class CategoriesStore {
    @observable categories = CATEGORIES;


}
export default new CategoriesStore();