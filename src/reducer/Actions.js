import { ADD_ITEM, DATA_ITEM, DECREASE_ITEM, INCREASE_ITEM, INFO_USER, IS_USER, ITEM_AWAIT, ITEM_LOVE, OPEN_CART, OPEN_NAVBAR, REMOVE_ALL, REMOVE_ITEM, SERACH_VALUE } from "./Constant"

const setData = payload => {
     return {
          type: DATA_ITEM,
          payload
     }
}

const openCart = payload => {
     return {
          type: OPEN_CART,
          payload
     }
}

const addItem = payload => {
     return {
          type: ADD_ITEM,
          payload
     }
}

const removeItem = payload => {
     return {
          type: REMOVE_ITEM,
          payload
     }
}

const increaseItem = payload => {
     return {
          type: INCREASE_ITEM,
          payload
     }
}

const decreaseItem = payload => {
     return {
          type: DECREASE_ITEM,
          payload
     }
}

const itemAwait = payload => {
     return {
          type: ITEM_AWAIT,
          payload
     }
}

const isUser = payload => {
     return {
          type: IS_USER,
          payload
     }
}

const removeAll = payload => {
     return {
          type: REMOVE_ALL,
          payload
     }
}

const infoUser = payload => {
     return {
          type: INFO_USER,
          payload
     }
}

const searchValue = payload => {
     return {
          type: SERACH_VALUE,
          payload
     }
}

const openNavbar = payload => {
     return {
          type: OPEN_NAVBAR,
          payload
     }
} 

const itemLove = payload => {
     return {
          type: ITEM_LOVE,
          payload
     }
} 

export { setData, openCart, addItem, removeItem, increaseItem, 
          decreaseItem, itemAwait, isUser, removeAll, infoUser, 
          searchValue, openNavbar, itemLove
     }
