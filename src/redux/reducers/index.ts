import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer'

export const rootReducer = combineReducers({
    cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>