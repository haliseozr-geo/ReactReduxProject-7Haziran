import * as types from "../actions/actionTypes";

export function addToCart(cartItem) {
  return {
    type: types.ADD_TO_CART,
    payload: cartItem,
  };
}
export function removeFromCart(product) {
  return {
    type: types.REMOVE_FROM_CART,
    payload: product,
  };
}

export function totalPrice(price){
  return {
    type: types.TOTAL_PRICE,
    payload: price,
}
}
