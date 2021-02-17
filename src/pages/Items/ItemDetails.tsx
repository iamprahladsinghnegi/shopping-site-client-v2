import { Col, Row, Carousel, Divider, Radio, RadioChangeEvent, Button, Affix } from 'antd';
import React from 'react';
import { NavBreadcrumb } from 'src/components/Breadcrumb/Breadcrumb';
import './index.scss';
import { CommentOutlined, ProfileOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

interface ItemDetailsProps {

}
const tempData2 = [
    { number: 1 },
    { number: 1 },
    { number: 1 },
    { number: 1 },
    { number: 1 }
]
const sizeArray = ['42', '44', '46', '48']



const itemData = {
    details: "Black and grey checked casual shirt, has a spread collar, long roll - up sleeves, button placket, curved hem and 1 patch pocket",
    size: "The model(height 6') is wearing a size 40",
    fit: "Slim fit",
    materials: "Cotton",
    care: "Machine - wash"
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({ }) => {
    const onChange = (e: RadioChangeEvent) => {
        console.log(e)

    }
    return (
        <div className="item-details">
            <div className="item-details-breadcrumb">
                <NavBreadcrumb />
            </div>
            <div className="item-details-content">
                <Row className="item-details-content-row" gutter={24} style={{ margin: 0 }}>
                    <Col className="item-details-content-col1" xs={24} sm={24} md={12} lg={14} xl={14} xxl={14}>
                        <div className="item-details-content-preview">
                            <Carousel className="item-details-content-preview-carousel">
                                {tempData2.map(item => {
                                    return <div className="item-details-content-preview-carousel-image">
                                        <h3>{item.number}</h3>
                                    </div>
                                })}
                            </Carousel>
                        </div>
                    </Col>
                    <Col className="item-details-content-col2" xs={24} sm={24} md={12} lg={10} xl={10} xxl={10}>
                        <div className="item-details-content-description">
                            <div className="item-details-content-description-info">
                                <div className="item-details-content-description-info-head">
                                    <h1 className="item-details-content-description-info-head-title">HIGHLANDER</h1>
                                    <h1 className="item-details-content-description-info-head-name">Highlander Black Solid Jeans </h1>
                                </div>
                                <div className="item-details-content-description-info-review">
                                    <div className="item-details-content-description-info-review-container">
                                        <CommentOutlined />
                                        <div className="item-details-content-description-info-review-text">
                                            27000 Review
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <div className="item-details-content-description-info-price">
                                    <p className="item-details-content-description-info-price-amount" >
                                        Rs. 500
                                    </p>
                                    <p className="item-details-content-description-info-price-text">
                                        inclusive of all taxes
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="item-details-content-size-container">
                            <div className="item-details-content-size-container-title">
                                <h3>
                                    Select Size
                                </h3>
                                <span>
                                    <button>
                                        View Chart
                                    </button>
                                </span>
                            </div>
                            <div className="item-details-content-size-container-options" >
                                <Radio.Group onChange={onChange}>
                                    {sizeArray.map((item) => {
                                        return <Radio.Button value={item}>{item}</Radio.Button>
                                    })}
                                </Radio.Group>
                            </div>
                        </div>
                        <Affix offsetBottom={12}>
                            <div className="item-details-content-action">
                                <Row gutter={24}>
                                    <Col className="item-details-content-action-cart"
                                        xs={{ span: 13, offset: 1, order: 2 }} sm={{ span: 12, offset: 0, order: 2 }} md={{ span: 10, offset: 0, order: 1 }} lg={{ span: 10, offset: 0, order: 1 }} xl={{ span: 10, offset: 0, order: 1 }} xxl={{ span: 10, offset: 0, order: 1 }}>
                                        <Button onClick={e => { e.preventDefault() }} className="item-details-content-action-cart-button" type="primary" icon={<ShoppingCartOutlined />}>
                                            ADD TO CART
                                        </Button>
                                    </Col>
                                    <Col className="item-details-content-action-star"
                                        xs={{ span: 10, offset: 0, order: 1 }} sm={{ span: 12, offset: 0, order: 1 }} md={{ span: 8, offset: 2, order: 2 }} lg={{ span: 8, offset: 2, order: 2 }} xl={{ span: 8, offset: 2, order: 2 }} xxl={{ span: 8, offset: 2, order: 2 }}>
                                        <Button onClick={e => { e.preventDefault() }} type="default" icon={<HeartOutlined />}>
                                            WISHLIST
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Affix>
                        <Divider />
                        <div className="item-details-content-product">
                            <div className="item-details-content-product-description">
                                <div className="item-details-content-product-description-title">
                                    <h4>
                                        Product Details
                                    </h4>
                                    <span className="item-details-content-product-description-title-icon">
                                        <ProfileOutlined />
                                    </span>
                                </div>
                                <p>
                                    {itemData.details}
                                </p>
                            </div>
                            <div className="item-details-content-product-size">
                                <h4>
                                    Size & Fit
                                </h4>
                                <p>
                                    <span>
                                        {itemData.fit}
                                    </span>
                                    <br />
                                    <span>
                                        {itemData.size}
                                    </span>
                                </p>
                            </div>
                            <div className="item-details-content-product-care">
                                <h4>
                                    Material & Care
                                </h4>
                                <p>
                                    <span>
                                        {itemData.materials}
                                    </span>
                                    <br />
                                    <span>
                                        {itemData.care}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    );
}