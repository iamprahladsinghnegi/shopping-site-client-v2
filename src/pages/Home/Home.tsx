import React from 'react';
import "./index.scss";
import { Carousel, Col, Row } from 'antd';
import { CustomCard } from '../../components/CustomCard/CustomCard';
import { RouteComponentProps } from 'react-router-dom';
import { useGetAllSubCategoriesWithCategoryQuery, useGetLAtestOffersQuery } from 'src/generated/graphql';
interface HomeProps {

}

export const Home: React.FC<HomeProps & RouteComponentProps> = ({ history }) => {
    const { data: offers, loading: offerLoading } = useGetLAtestOffersQuery();
    const { data: categoryData, loading: categoryLoading } = useGetAllSubCategoriesWithCategoryQuery();
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, category: string): void => {
        history.push({ pathname: `./items/${category}` })
    }
    if (offers) {
        console.log(offers)
    }

    return (
        <div className="homepage">
            <Carousel autoplay className="homepage-carousel" >
                {offerLoading ?
                    <div>Loading</div>
                    :
                    offers?.getLatestOffers.offers.map(item => {
                        return <div key={item.offerId} className="homepage-carousel-item">
                            <img src={`${item.image}`} alt={item.title} />
                        </div>
                    })
                }

            </Carousel>
            {/* <div className="homepage-item-brands">
                <h1>BIGGEST DEALS ON TOP BRANDS</h1>
                <div className="homepage-item-brands-container" >
                    <Row gutter={24} >
                        {tempData.map(item => {
                            return <Col key={item.title} xs={12} sm={12} md={8} lg={8} xl={6} xxl={4} >
                                <CustomCard
                                    param={item.cateogry}
                                    handleClick={handleClick}
                                    hoverable={true}
                                    styleName="cart-category-square"
                                    imageUrl={item.imageUrl}
                                    title={item.title} />
                            </Col>
                        })}
                    </Row>
                </div>
            </div>
            <Divider className="homepage-divider" dashed /> */}
            <div className="homepage-item-categories">
                <h1>CATEGORIES TO BAG</h1>
                <div className="homepage-item-categories-container">
                    <Row gutter={24} style={{ margin: "0" }}>
                        {categoryLoading ?
                            <>
                                loading categories
                            </>
                            :
                            <>
                                {(categoryData && categoryData.getAllSubCategoriesWithCategory) ?
                                    categoryData.getAllSubCategoriesWithCategory.map(item => {
                                        return <Col key={item.subCategory} xs={12} sm={12} md={8} lg={6} xl={6} xxl={4} >
                                            <CustomCard
                                                param={item.subCategory}
                                                handleClick={handleClick}
                                                hoverable={false}
                                                styleName="cart-category-round"
                                                imageUrl={item.image}
                                                title={item.subCategory} />
                                        </Col>
                                    })
                                    :
                                    null
                                }
                            </>
                        }
                    </Row>
                </div>
            </div>
        </div>
    )
}