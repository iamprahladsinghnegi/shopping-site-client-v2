import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { CartState } from 'src/redux/types/cart';
import { addItem } from 'src/redux/actions/carts';

interface CartProps {

}

export const Cart: React.FC<CartProps> = ({ }) => {
    const items = useSelector<RootState, CartState['items']>(
        (state) => state.cart.items
    );
    console.log(items)
    const dispatch = useDispatch();
    const addNewItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let item = {
            id: "123",
            name: 'new',
            quantity: 2,
            price: 100,
            timestamp: 3
        }
        dispatch(addItem(item))
    }
    return (
        <div>
            cart details
            {items.map(item => {
                return <p>{item.id}</p>
            })}

            <button onClick={e => addNewItem(e)}>add new</button>
        </div>
    );
}