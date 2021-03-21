import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import { CartItem } from 'src/components/CartItem/CartItem';
import { useGetCartDetailsQuery } from 'src/generated/graphql';
import './index.scss';
interface CartProps {

}

export const Cart: React.FC<CartProps> = ({ }) => {
    const { data: cartData, loading, error } = useGetCartDetailsQuery();

    if (error) {
        //navigate to home
        console.log(error);
    }

    console.log(cartData);
    if (loading || !cartData?.getCartDetails) {
        return <Skeleton />
    }
    return (
        <div className="cart">
            <Row gutter={24}>
                <Col span={16} >
                    {cartData.getCartDetails.items.map((ele, index) => {
                        return <CartItem />
                    })}
                </Col>
                <Col span={8}>

                </Col>
            </Row>
        </div>
    );
}