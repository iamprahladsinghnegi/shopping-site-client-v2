
export interface Item {
    id: string
    name: string
    quantity: number
    price: number
    timestamp: number
}

export interface CartState {
    items: Item[]
}

export const ADD_ITEM = 'ADD_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

interface AddItemAction {
    type: typeof ADD_ITEM
    payload: Item
}

interface DeleteItemAction {
    type: typeof DELETE_ITEM
    meta: {
        timestamp: number
    }
}

export type CartActionTypes = AddItemAction | DeleteItemAction