import _ from 'lodash';
import { BuyerStore } from '../store/buyer';
import { SellerStore } from '../store/seller';

export const isEmpty = (str) => {
    if (str.trim() === "") return true;
    return false;
  };
  
  export const isEmail = (email) => {
    const regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) {
      return true;
    }
    return false;
  };

  export const isEmailExist = (email) => {
    return _.find(SellerStore.sellers, (seller) => seller.email.trim() === email.trim()) || _.find(BuyerStore.buyers, (buyer)=> buyer.email === email)
  };