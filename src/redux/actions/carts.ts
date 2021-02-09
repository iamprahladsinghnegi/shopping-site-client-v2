
import { Item, ADD_ITEM, DELETE_ITEM, CartActionTypes } from '../types/cart'

// TypeScript infers that this function is returning AddItemAction
export function addItem(item: Item): CartActionTypes {
    return {
        type: ADD_ITEM,
        payload: item
    }
}

// TypeScript infers that this function is returning DeleteItemAction
export function deleteItem(timestamp: number): CartActionTypes {
    return {
        type: DELETE_ITEM,
        meta: {
            timestamp
        }
    }
}