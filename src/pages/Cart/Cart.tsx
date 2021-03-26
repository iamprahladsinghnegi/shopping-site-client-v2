import { Button, Card, Col, Divider, Row, Skeleton } from 'antd';
import React from 'react';
import { CartItemView } from 'src/components/CartItemView/CartItemView';
import { useGetCartDetailsQuery } from 'src/generated/graphql';
import './index.scss';
interface CartProps {

}

export const Cart: React.FC<CartProps> = ({ }) => {
    const { data: cartData, loading, error } = useGetCartDetailsQuery({ fetchPolicy: 'network-only' });

    if (error) {
        //navigate to home
        console.log(error);
    }

    console.log(cartData);
    if (loading || !cartData?.getCartDetails) {
        return <Skeleton />
    }

    let priceDetails = cartData.getCartDetails.items.reduce(function (accumulator, currentValue) {
        return {
            price: Number(accumulator.price) + (Number(currentValue.price) * Number(currentValue.quantity)),
            priceWithoutDiscount: Number(accumulator.priceWithoutDiscount) + Math.ceil((((Number(currentValue.discount) + 100) * Number(currentValue.price)) * .01) * Number(currentValue.quantity)),
        }
    }, { price: 0, priceWithoutDiscount: 0 });

    let totalPayable = priceDetails.price;

    if (priceDetails.price < 500 && cartData.getCartDetails.items.length > 0) {
        totalPayable += 50;
    }

    return (
        <div className="cart">
            <Row gutter={24}>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 0 }} xl={{ span: 16, offset: 0 }} xxl={{ span: 16, offset: 0 }} >
                    {cartData.getCartDetails.items.map((ele, index) => {
                        return <CartItemView cartId={cartData.getCartDetails.cartId} itemId={ele.itemId} size={ele.size} quantity={ele.quantity} />
                    })}
                </Col>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 8, offset: 0 }} xxl={{ span: 8, offset: 0 }}>
                    <Card
                        className="cart-info"
                        style={{ marginTop: 16 }}
                    >
                        <div className='cart-info-content'>
                            <h3>
                                PRICE DETAILS ({cartData.getCartDetails.count} Items)
                            </h3>
                            <Divider />
                            <div className="cart-info-content-priceDetails">
                                <p>
                                    <span className="cart-info-content-priceDetails-left">
                                        Total MRP
                                  </span>
                                    <span className="cart-info-content-priceDetails-right">
                                        &#8377; {priceDetails.priceWithoutDiscount}
                                    </span>
                                </p>
                                <p>
                                    <span className="cart-info-content-priceDetails-left">
                                        Dicount on MRP
                                  </span>
                                    <span className="cart-info-content-priceDetails-right color-green">
                                        - &#8377; {priceDetails.priceWithoutDiscount - priceDetails.price}
                                    </span>
                                </p>
                                <p>
                                    <span className="cart-info-content-priceDetails-left">
                                        Coupon Discount
                                  </span>
                                    <span className="cart-info-content-priceDetails-right">
                                        &#8377; 0
                                  </span>
                                </p>
                                {
                                    cartData.getCartDetails.items.length > 0 &&
                                    <p>
                                        <span className="cart-info-content-priceDetails-left">
                                            Conevnience Fee
                                        </span>
                                        <span className="cart-info-content-priceDetails-right">
                                            {priceDetails.price >= 500 ?
                                                <>
                                                    <span className="cart-info-content-priceDetails-right-line">
                                                        <span>&#8377; 50</span>
                                                    </span>
                                                    <span className="color-green">
                                                        FREE
                                             </span>
                                                </>
                                                :
                                                <span>&#8377; 50</span>}
                                        </span>
                                    </p>

                                }
                            </div>
                            <Divider />
                            <div className="cart-info-content-priceTotal">
                                <h3>
                                    <span>
                                        Total Amount
                                    </span>
                                    <span className="cart-info-content-priceTotal-right">
                                        &#8377; {totalPayable}
                                    </span>
                                </h3>
                            </div>
                        </div>
                        <div className="cart-info-footer">
                            <Button disabled={totalPayable === 0 ? true : false} type="primary">
                                Place Order
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}