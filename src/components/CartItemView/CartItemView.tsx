import { Card, Col, Row, Modal, Slider, Radio, RadioChangeEvent, Skeleton, message } from 'antd';
import React, { useState } from 'react';
import { useGetItemDetailsForCartQuery, useAdjustItemQyantityMutation, GetCartDetailsQuery, GetCartDetailsDocument, CartItem, useAdjustItemSizeMutation, useRemoveItemFromCartMutation } from 'src/generated/graphql';
// import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import './index.scss';

interface CartItemViewProps {
    itemId: string;
    quantity: number;
    size: string;
    cartId: string;
}

export const CartItemView: React.FC<CartItemViewProps> = ({ itemId, quantity, size, cartId }) => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<string>('');
    const [selectedSize, setSelectedSize] = React.useState<string>(size);
    const [selectedQuantity, setSelectedQuantity] = React.useState<number>(quantity);
    const { data, loading, error } = useGetItemDetailsForCartQuery({ variables: { itemId } });
    const [addjustItemQuantity] = useAdjustItemQyantityMutation();
    const [addjustItemSize] = useAdjustItemSizeMutation();
    const [removeItemFromCart] = useRemoveItemFromCartMutation();


    if (data) {
        console.log(data);
    }
    const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        // setModalType('');
        if (modalType === 'size') {
            setSelectedSize(size);
        }
        else {
            setSelectedQuantity(quantity);
        }
        setVisible(false);
    };
    const showModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string): void => {
        event.preventDefault();
        if (type === 'size') {
            setSelectedSize(size);
        } else {
            setSelectedQuantity(quantity);
        }
        setModalType(type)
        setVisible(true);
    };

    const onClickRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        removeItemFromCart({
            variables: {
                cartId,
                itemId
            },
            update: (store, { data }) => {
                if (data && data.removeItemFromCart) {
                    let cartData = store.readQuery<GetCartDetailsQuery>({
                        query: GetCartDetailsDocument
                    })
                    if (cartData?.getCartDetails) {
                        let items = cartData.getCartDetails.items.filter((x) => x.itemId !== data.removeItemFromCart);

                        store.writeQuery<GetCartDetailsQuery>({
                            query: GetCartDetailsDocument,
                            data: {
                                __typename: "Query",
                                getCartDetails: { ...cartData.getCartDetails, items },
                            }
                        })
                    } else {
                        console.log('unbale to update cart cache')
                    }
                }
            }
        }).then(res => {
            if (!res || res.errors || !res.data) {
                message.error('Unable to remove Item from cart!');
            }
            else {
                message.info('Item Removed!');
            }
        })
    };

    const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        setConfirmLoading(true);
        if (modalType === 'quantity') {
            addjustItemQuantity({
                variables: {
                    cartId,
                    itemId,
                    quantity: selectedQuantity
                },
                update: (store, { data }) => {
                    if (data && data.adjustItemQyantity) {
                        let cartData = store.readQuery<GetCartDetailsQuery>({
                            query: GetCartDetailsDocument
                        })
                        if (cartData?.getCartDetails) {
                            let cartDetails = JSON.parse(JSON.stringify(cartData.getCartDetails));
                            let index: number = cartDetails.items.findIndex((x: CartItem) => x.itemId === itemId);
                            cartDetails.items[index].quantity = data.adjustItemQyantity;
                            store.writeQuery<GetCartDetailsQuery>({
                                query: GetCartDetailsDocument,
                                data: {
                                    __typename: "Query",
                                    getCartDetails: { ...cartDetails },
                                }
                            })
                        } else {
                            console.log('unbale to update cart cache')
                        }
                    }
                }
            }).then(res => {
                if (!res || res.errors || !res.data) {
                    message.error('Unable to adjust quantity');
                } else {
                    message.info('quantity updated');
                }
                setVisible(false);
                setConfirmLoading(false);
            })
        }
        else {
            addjustItemSize({
                variables: {
                    cartId,
                    itemId,
                    size: selectedSize
                }
                ,
                update: (store, { data }) => {
                    if (data && data.adjustItemSize) {
                        let cartData = store.readQuery<GetCartDetailsQuery>({
                            query: GetCartDetailsDocument
                        })
                        if (cartData?.getCartDetails) {
                            let cartDetails = JSON.parse(JSON.stringify(cartData.getCartDetails));
                            let index: number = cartDetails.items.findIndex((x: CartItem) => x.itemId === itemId);
                            cartDetails.items[index].size = data.adjustItemSize;
                            store.writeQuery<GetCartDetailsQuery>({
                                query: GetCartDetailsDocument,
                                data: {
                                    __typename: "Query",
                                    getCartDetails: { ...cartDetails },
                                }
                            })
                        } else {
                            console.log('unbale to update cart cache')
                        }
                    }
                }
            }).then(res => {
                if (!res || res.errors || !res.data) {
                    message.error('Unable to adjust size');
                } else {
                    message.info('size updated');
                }
                setVisible(false);
                setConfirmLoading(false);
            })

        }
    };
    const onChange = (e: RadioChangeEvent) => {
        setSelectedSize(e.target.value);
    }

    const onChangeNumber = (value: number): void => {
        setSelectedQuantity(value);
    }
    if (error) {
        return <Skeleton />;
    }
    if (loading || !data || !data.getItemDetails) {
        return <Skeleton />
    }

    const modalTitle: string = modalType === 'size' ? 'Select Size' : 'Select Quantity';


    const modalContent: React.ReactNode = modalType === 'size' ?
        <>
            <Radio.Group value={selectedSize} onChange={onChange}>
                {[{ name: 'S', quantity: 20 }, { name: 'M', quantity: 20 }, { name: 'L', quantity: 0 }, { name: 'XL', quantity: 20 }].map((item, index) => {
                    return <Radio.Button disabled={item.quantity === 0 ? true : false} value={item.name}>{item.name}</Radio.Button>
                })}
            </Radio.Group>
        </>
        :
        <div className="numberSlider">
            <span className="numberSlider-left">
                1
            </span>
            <Slider min={1} max={20} value={selectedQuantity} onChange={onChangeNumber} />
            <span className="numberSlider-right">
                20
            </span>
        </div>
        ;
    const discount = data.getItemDetails.inventory.discount || 0;
    const priceWithoutDiscount = Math.ceil((data.getItemDetails.inventory.price * (discount + 100)) / 100);
    return (
        <Card
            className="cartItem"
            style={{ width: '100%', marginTop: 16 }}
            actions={[
                <button onClick={onClickRemove} >Remove</button>
            ]}
        >
            <div className="cartItem-content">
                <Row gutter={24}>
                    <Col span={6}>
                        <img alt='sometext' src={data.getItemDetails.images[0]} />
                    </Col>
                    <Col span={18}>
                        <div className="cartItem-content-item">
                            <div className="cartItem-content-item-description">
                                <h3>
                                    {data.getItemDetails.brand}
                                </h3>
                                <p className="cartItem-content-item-description-name">
                                    {data.getItemDetails.name}
                                </p>
                                <p className="cartItem-content-item-description-seller">
                                    Men Black Printed Round Neck T-shirt
                                </p>
                                <div className="cartItem-content-item-description-action">
                                    <p>
                                        <span>
                                            Size :
                                        </span>
                                        <button onClick={e => { showModal(e, 'size') }}>
                                            {selectedSize}
                                        </button>
                                    </p>
                                    <p>
                                        <span>
                                            Quantity :
                                        </span>
                                        <button onClick={e => { showModal(e, 'quantity') }}>
                                            {selectedQuantity}
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div className="cartItem-content-item-price">
                                <p className="cartItem-content-item-price-amount">
                                    &#8377; {data.getItemDetails.inventory.price}
                                </p>
                                <p className="cartItem-content-item-price-discount">
                                    <span className="cartItem-content-item-price-discount-line">
                                        <span>&#8377; {priceWithoutDiscount}</span>
                                    </span>
                                    <span className="cartItem-content-item-price-discount-value">
                                        ~{discount}% OFF
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <Modal
                centered
                title={modalTitle}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {modalContent}
            </Modal>
        </Card>
    )
}
