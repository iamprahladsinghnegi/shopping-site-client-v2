
import {
    CartState,
    CartActionTypes,
    ADD_ITEM,
    DELETE_ITEM
} from '../types/cart'

const initialState: CartState = {
    items: []
}

export function cartReducer(
    state = initialState,
    action: CartActionTypes
): CartState {
    switch (action.type) {
        case ADD_ITEM:
            return {
                items: [...state.items, action.payload]
            }
        case DELETE_ITEM:
            return {
                items: state.items.filter(
                    item => item.timestamp !== action.meta.timestamp
                )
            }
        default:
            return state
    }
}