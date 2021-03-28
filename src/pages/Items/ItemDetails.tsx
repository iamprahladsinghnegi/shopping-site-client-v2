import { Col, Row, Carousel, Divider, Radio, RadioChangeEvent, Button, Affix, message } from 'antd';
import React, { useState } from 'react';
import { NavBreadcrumb } from 'src/components/Breadcrumb/Breadcrumb';
import './index.scss';
import { CommentOutlined, ProfileOutlined, ShoppingCartOutlined, HeartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useGetItemDetailsQuery, useAddToCartMutation, AddOrRemove, useAddRemoveItemToWishlistMutation } from 'src/generated/graphql';

interface ItemDetailsProps {

}
export const ItemDetails: React.FC<ItemDetailsProps & RouteComponentProps> = ({ history }) => {
    const { pathname } = useLocation();
    const routes = pathname.split('/');
    const [buttonText, setButtonText] = useState<string>('ADD TO CART');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [addOrRemoveItem] = useAddRemoveItemToWishlistMutation();

    const navgiateTo = () => {
        console.log(routes[2]);
        history.replace(`/items/${routes[2]}`);
    }
    if (!routes[3]) {
        navgiateTo();
    }
    const itemId = routes[3].split('$')[0];
    const { data: queryData, loading: queryLoading, error: queryError, refetch } = useGetItemDetailsQuery({ fetchPolicy: 'network-only', variables: { itemId } });
    const [addToCart] = useAddToCartMutation({ variables: { itemId, quantity: 1, size: selectedSize } });

    const onChange = (e: RadioChangeEvent) => {
        setSelectedSize(e.target.value);
    }
    if (queryError) {
        navgiateTo();
    }

    if (queryLoading || !queryData || !queryData.getItemDetails) {
        return <div>
            Loading....
        </div>
    }
    const isOutOfStock: boolean = queryData.getItemDetails.inventory.available.find(ele => ele.quantity !== 0) ? false : true;

    const isInWishList: boolean = queryData.getItemDetails.isStared;

    const handlePrimaryButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        e.preventDefault()
        if (buttonText !== 'ADD TO CART') {
            //navigate to bag
            history.push('/cart');
        }
        else {
            if (selectedSize === '') {
                message.warn('Please select size!');
            } else {
                addToCart().then(response => {
                    if (response.errors || response.data?.addToCart === false) {
                        message.error('Unable to add item to bag!');
                    }
                    else {
                        message.info('Item successfully added to bag!');
                        setButtonText('GO TO BAG');
                    }
                }).catch(err => {
                    console.log('Error', err);
                    message.error('Unable to add item to bag!');
                })
            }

        }
    }

    const handleSecondaryClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        let action: AddOrRemove;
        action = AddOrRemove['Add']
        addOrRemoveItem({ variables: { itemId: queryData.getItemDetails.itemId, action } }).then(isUpdated => {
            if (!isUpdated || isUpdated.errors || !isUpdated.data) {
                message.info('Unable to add to wishlist')
            } else if (isUpdated.data.addRemoveItemToWishlist === false) {
                message.info('Unable to add to wishlist')
            } else {
                refetch();
            }
        })
    }

    console.log(queryData)

    return (
        <div className="item-details">
            <div className="item-details-breadcrumb">
                <NavBreadcrumb />
            </div>
            <div className="item-details-content">
                <Row className="item-details-content-row" gutter={24} style={{ margin: 0 }}>
                    <Col className="item-details-content-col1" xs={24} sm={24} md={12} lg={14} xl={14} xxl={14}>
                        <div className="item-details-content-preview">
                            <Carousel arrows nextArrow={<RightOutlined />} prevArrow={<LeftOutlined />} className="item-details-content-preview-carousel">
                                {queryData.getItemDetails.images.map((url, index) => {
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
                                <Radio.Group value={selectedSize} onChange={onChange}>
                                    {queryData.getItemDetails.inventory.available.map((item, index) => {
                                        return <Radio.Button disabled={item.quantity === 0 ? true : false} value={item.name}>{item.name}</Radio.Button>
                                    })}
                                </Radio.Group>
                            </div>
                        </div>
                        <Affix offsetBottom={12}>
                            <div className="item-details-content-action">
                                <Row gutter={24}>
                                    <Col className="item-details-content-action-cart"
                                        xs={{ span: 13, offset: 1, order: 2 }} sm={{ span: 12, offset: 0, order: 2 }} md={{ span: 10, offset: 0, order: 1 }} lg={{ span: 10, offset: 0, order: 1 }} xl={{ span: 10, offset: 0, order: 1 }} xxl={{ span: 10, offset: 0, order: 1 }}>
                                        <Button disabled={isOutOfStock} onClick={e => { handlePrimaryButtonClick(e) }} className="item-details-content-action-cart-button" type="primary" icon={<ShoppingCartOutlined />}>
                                            {isOutOfStock ? 'OUT OF STCOK' : buttonText}
                                        </Button>
                                    </Col>
                                    <Col className="item-details-content-action-star"
                                        xs={{ span: 10, offset: 0, order: 1 }} sm={{ span: 12, offset: 0, order: 1 }} md={{ span: 8, offset: 2, order: 2 }} lg={{ span: 8, offset: 2, order: 2 }} xl={{ span: 8, offset: 2, order: 2 }} xxl={{ span: 8, offset: 2, order: 2 }}>
                                        <Button disabled={isInWishList} onClick={e => { handleSecondaryClick(e) }} type="default" icon={<HeartOutlined />}>
                                            {isInWishList ? 'IN WISHLIST' : 'WISHLIST'}
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
                            {queryData.getItemDetails.description.specifications && queryData.getItemDetails.description.specifications.length > 0 && <div className="item-details-content-product-specifications">
                                <h4>
                                    Specifications
                                </h4>
                                <Row gutter={24}>
                                    {queryData.getItemDetails.description.specifications.map((ele, index) => {
                                        return <Col span={12}>
                                            <div className="item-details-content-product-specifications-content">
                                                <p className="item-details-content-product-specifications-content-title">
                                                    {ele.key}
                                                </p>
                                                <p className="item-details-content-product-specifications-content-text">
                                                    {ele.value}
                                                </p>
                                            </div>
                                        </Col>
                                    })}
                                </Row>
                            </div>
                            }
                            <div className="item-details-content-product-extra">
                                <h4>
                                    Complete The Look
                                </h4>
                                <p>
                                    <span>
                                        {queryData.getItemDetails.description.extra}
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