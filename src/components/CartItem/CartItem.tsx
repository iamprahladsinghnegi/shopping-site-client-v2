import { Card, Col, Row, Modal, Slider, Radio, RadioChangeEvent } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import React, { useState } from 'react';
// import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import './index.scss';

interface ICartItemProps {
    itemId?: string;
    quantity?: number;
    size?: string;
}

export const CartItem: React.FC<ICartItemProps> = ({ }) => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<string>('');
    const [selectedSize, setSelectedSize] = React.useState<string>('');
    const [selectedQuantity, setSelectedQuantity] = React.useState<number>(0);
    const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        // setModalType('');
        if (modalType === 'size') {
            setSelectedSize('');
        }
        else {
            setSelectedQuantity(0);
        }
        setVisible(false);
    };
    const showModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string): void => {
        if (type === 'size') {
            setSelectedSize('M');
        } else {
            setSelectedQuantity(1);
        }
        setModalType(type)
        setVisible(true);
    };
    const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        setConfirmLoading(true);
        setTimeout(() => {
            setModalType('');
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const onChange = (e: RadioChangeEvent) => {
        setSelectedSize(e.target.value);
    }

    const onChangeNumber = (value: number): void => {
        setSelectedQuantity(value);
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
    return (
        <Card
            className="cartItem"
            style={{ width: '100%', marginTop: 16 }}
            actions={[
                <button>Remove</button>
            ]}
        >
            <div className="cartItem-content">
                <Row gutter={24}>
                    <Col span={6}>
                        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </Col>
                    <Col span={18}>
                        <div className="cartItem-content-item">
                            <div className="cartItem-content-item-description">
                                <h3>
                                    NIKE
                                </h3>
                                <p className="cartItem-content-item-description-name">
                                    Men Black Printed Round Neck T-shirt
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
                                            L
                                        </button>
                                    </p>
                                    <p>
                                        <span>
                                            Quantity :
                                        </span>
                                        <button onClick={e => { showModal(e, 'quantity') }}>
                                            2
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div className="cartItem-content-item-price">
                                <p className="cartItem-content-item-price-amount">
                                    Rs. 449
                                </p>
                                <p className="cartItem-content-item-price-discount">
                                    <span className="cartItem-content-item-price-discount-line">
                                        <span>Rs. 999</span>
                                    </span>
                                    <span className="cartItem-content-item-price-discount-value">
                                        10% OFF
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
