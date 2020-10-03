
export const ADD_CART = "ADD_CART"
export const VIEW_DETAILS = "VIEW_DETAILS"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const ADD_QUANTITY = "ADD_QUANTITY"
export const SUBTRACT_QUANTITY = "SUBTRACT_QUANTITY"
export const CHANGE_CATEGORY = "CHANGE_CATEGORY"
export const FILTER_ITEM =  "FILTER_ITEM"
export const SEARCH_ITEM = "SEARCH_ITEM"

export function addToCart(itemId) {
    console.log(itemId)
    return {
        type: ADD_CART,
        payload: itemId,
    }
}

export function viewDetails(itemId) {
    console.log(itemId)
    return {
        type: VIEW_DETAILS,
        payload: itemId,
    }
}

export function removeFromCart(itemId) {
    console.log(itemId)
    return {
        type: REMOVE_FROM_CART,
        payload: itemId,
    }
}

export function addQuantity(itemId) {
    console.log(itemId)
    return {
        type: ADD_QUANTITY,
        payload: itemId,
    }
}

export function subtractQuantity(itemId) {
    console.log(itemId)
    return {
        type: SUBTRACT_QUANTITY,
        payload: itemId,
    }
}

export function changeCategory(payload) {
    // console.log(itemId)
    return {
        type: CHANGE_CATEGORY,
        payload
    }
}

export function filterItem(payload) {
    console.log(payload)
    return {
        type: FILTER_ITEM,
        payload
    }
}

export function searchItem(payload) {
    console.log(payload)
    return {
        type: SEARCH_ITEM,
        payload
    }
}
