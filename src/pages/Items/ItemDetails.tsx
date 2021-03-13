import { Col, Row, Carousel, Divider, Radio, RadioChangeEvent, Button, Affix, Image } from 'antd';
import React from 'react';
import { NavBreadcrumb } from 'src/components/Breadcrumb/Breadcrumb';
import './index.scss';
import { CommentOutlined, ProfileOutlined, ShoppingCartOutlined, HeartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useGetItemDetailsQuery } from 'src/generated/graphql';

interface ItemDetailsProps {

}

const IMAGES: string[] = [
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2499730/2018/12/27/8c3d1c44-1f77-4a07-9e80-73842f34bef21545911287559-INVICTUS-Men-Brown-Textured-Formal-Oxfords-6901545911286502-1.jpg",
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2499730/2018/12/27/8c3d1c44-1f77-4a07-9e80-73842f34bef21545911287559-INVICTUS-Men-Brown-Textured-Formal-Oxfords-6901545911286502-1.jpg",
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2499730/2018/12/27/8c3d1c44-1f77-4a07-9e80-73842f34bef21545911287559-INVICTUS-Men-Brown-Textured-Formal-Oxfords-6901545911286502-1.jpg",
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2499730/2018/12/27/8c3d1c44-1f77-4a07-9e80-73842f34bef21545911287559-INVICTUS-Men-Brown-Textured-Formal-Oxfords-6901545911286502-1.jpg",
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/4318138/2018/5/4/11525433792765-HERENOW-Men-Black-Printed-Round-Neck-T-shirt-2881525433792598-1.jpg",
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/4318138/2018/5/4/11525433792765-HERENOW-Men-Black-Printed-Round-Neck-T-shirt-2881525433792598-1.jpg"
]
export const ItemDetails: React.FC<ItemDetailsProps & RouteComponentProps> = ({ history }) => {
    const { pathname } = useLocation();
    const routes = pathname.split('/');

    const navgiateTo = () => {
        console.log(routes[2])
        history.replace(`/items/${routes[2]}`)
    }
    if (!routes[3]) {
        navgiateTo();
    }
    const itemId = routes[3].split('$')[0]
    const { data: queryData, loading: queryLoading, error: queryError } = useGetItemDetailsQuery({ variables: { itemId } })
    const onChange = (e: RadioChangeEvent) => {
        console.log(e)

    }

    if (queryLoading || !queryData) {
        return <div>
            Loading....
        </div>
    } else if (queryError) {
        navgiateTo();
    } else if (queryData && queryData.getItemDetails) {
        console.log('itemDetials', queryData)
        return (
            <div className="item-details">
                <div className="item-details-breadcrumb">
                    <NavBreadcrumb />
                </div>
                <div className="item-details-content">
                    <Row className="item-details-content-row" gutter={24} style={{ margin: 0 }}>
                        <Col className="item-details-content-col1" xs={24} sm={24} md={12} lg={14} xl={14} xxl={14}>
                            <div className="item-details-content-preview">
                                {/* <Row gutter={24} style={{ margin: 0 }}>
                                    {IMAGES.map(url => {
                                        return <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} >
                                            <Image src={url} />
                                        </Col>
                                    })}
                                </Row> */}
                                <Carousel arrows nextArrow={<RightOutlined />} prevArrow={<LeftOutlined />} className="item-details-content-preview-carousel">
                                    {IMAGES.map((url, index) => {
                                        return <div className="item-details-content-preview-carousel-imageview">
                                            <img src={url} alt={`${queryData.getItemDetails.brand}-${index}`} />
                                        </div>
                                    })}
                                </Carousel>
                            </div>
                        </Col>
                        <Col className="item-details-content-col2" xs={24} sm={24} md={12} lg={10} xl={10} xxl={10}>
                            <div className="item-details-content-description">
                                <div className="item-details-content-description-info">
                                    <div className="item-details-content-description-info-head">
                                        <h1 className="item-details-content-description-info-head-title">{queryData.getItemDetails.brand}</h1>
                                        <h1 className="item-details-content-description-info-head-name">{queryData.getItemDetails.name}</h1>
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
                                            Rs. {queryData.getItemDetails.inventory.price}
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
                                        {queryData.getItemDetails.inventory.available.map((item, index) => {
                                            return <Radio.Button disabled={item.quantity === 0 ? true : false} value={index}>{item.name}</Radio.Button>
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
                                                {queryData.getItemDetails.isStared ? 'IN WISHLIST' : 'WISHLIST'}
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
                                        {queryData.getItemDetails.description.details}
                                    </p>
                                </div>
                                <div className="item-details-content-product-size">
                                    <h4>
                                        Size & Fit
                                    </h4>
                                    <p>
                                        <span>
                                            {queryData.getItemDetails.description.fit}
                                        </span>
                                        <br />
                                        <span>
                                            {queryData.getItemDetails.description.size}
                                        </span>
                                    </p>
                                </div>
                                <div className="item-details-content-product-care">
                                    <h4>
                                        Material & Care
                                    </h4>
                                    <p>
                                        <span>
                                            {queryData.getItemDetails.description.materials}
                                        </span>
                                        <br />
                                        <span>
                                            {queryData.getItemDetails.description.care}
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
    return (
        <div>
            Loading...
        </div>
    )

}