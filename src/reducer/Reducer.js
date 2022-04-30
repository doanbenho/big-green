import { ADD_ITEM, DATA_ITEM, DECREASE_ITEM, INCREASE_ITEM, INFO_USER, IS_USER, ITEM_AWAIT, ITEM_LOVE, OPEN_CART, OPEN_NAVBAR, REMOVE_ALL, REMOVE_ITEM, SERACH_VALUE } from "./Constant";

const items = JSON.parse(localStorage.getItem('items_in_cart')) || []

export const initialState = {
     data_item: [],
     open_cart: false,
     items_in_cart: items,
     item_await: null,
     is_user: false,
     info_user: {},
     search_value: '',
     open_navbar: false,
     item_love: []
}

const reducer = (state, action) => {

     let data 
     
     switch (action.type) {
          case DATA_ITEM:
               data = {
                    ...state,
                    data_item: action.payload 
               }    
               break;
          case OPEN_CART:
               data={
                    ...state,
                    open_cart: action.payload
               }
               break;
          case ADD_ITEM:
               const item_cart = state.items_in_cart.find(item => item.id === action.payload.id)

               if(!item_cart) {
                    data = {
                         ...state,
                         items_in_cart: [...state.items_in_cart, action.payload]
                    }
               } else {
                    let new_item = [...state.items_in_cart]
                    const objIndex = new_item.findIndex(obj => obj.id === action.payload.id)
                    new_item[objIndex].amount += action.payload.amount
                    data = {
                         ...state,
                         items_in_cart: new_item
                    }
               }
               break;
          case REMOVE_ITEM:
               const newArray = [...state.items_in_cart]
               newArray[action.payload].amount = 1
               newArray.splice(action.payload, 1)
               data = {
                    ...state,
                    items_in_cart: newArray
               }
               break;
          case REMOVE_ALL:
               const arrayRemoveAll = [...state.items_in_cart]
               arrayRemoveAll.splice(0, arrayRemoveAll.length)
               data = {
                    ...state,
                    items_in_cart: arrayRemoveAll
               }
               break;
          case DECREASE_ITEM:
               let decrease_items = [...state.items_in_cart]
               decrease_items.forEach(item => {
                    if(item.id === action.payload) {
                         if(item.amount === 1) {
                              item.amount = 1
                         } else {
                              item.amount -= 1
                         }
                    }
               })               
               data = {
                    ...state,
                    items_in_cart: decrease_items
               }
               break;
          case INCREASE_ITEM:
               const increase_items = [...state.items_in_cart]
               increase_items.forEach(item => {
                    if(item.id === action.payload) {
                         item.amount += 1
                    }
               })               
               data = {
                    ...state,
                    items_in_cart: increase_items
               }
               break;
          case ITEM_AWAIT:
               data = {
                    ...state,
                    item_await: action.payload
               }
               break;
          case IS_USER:
               data = {
                    ...state,
                    is_user: action.payload
               }
               break;
          case INFO_USER:
               data = {
                    ...state,
                    info_user: action.payload
               }
               break;
          case SERACH_VALUE:
               data = {
                    ...state,
                    search_value: action.payload
               }
               break;
          case OPEN_NAVBAR:
               data = {
                    ...state,
                    open_navbar: action.payload
               }
               break;
          case ITEM_LOVE:
               data = {
                    ...state,
                    item_love: action.payload
               }
               break;
          default:
               throw new Error('invalid action ... ');
     }

     
     localStorage.setItem('items_in_cart', JSON.stringify(data.items_in_cart))
     return data
}


export default reducer