import React, { useEffect } from 'react';
import "./index.scss";
import { Carousel, Col, Divider, Row } from 'antd';
import { CustomCard } from '../../components/CustomCard/CustomCard';
import { RouteComponentProps } from 'react-router-dom';
interface HomeProps {

}

const tempData = [
    { cateogry: "Jeans", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "Jeans" },
    { cateogry: "jeans-1", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-1" },
    { cateogry: "jeans-2", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-2" },
    { cateogry: "jeans-3", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-3" },
    { cateogry: "jeans-4", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-4" },
    { cateogry: "jeans-5", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-5" },
    { cateogry: "jeans-6", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-6" },
    { cateogry: "jeans-7", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-7" },
    { cateogry: "jeans-8", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-8" },
    { cateogry: "jeans-9", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-9" },
    { cateogry: "jeans-10", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-10" },
    { cateogry: "jeans-11", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "jeans-11" }
]

const tempData2 = [
    { number: 1 },
    { number: 1 },
    { number: 1 },
    { number: 1 },
    { number: 1 }
]
export const Home: React.FC<HomeProps & RouteComponentProps> = ({ history }) => {
    useEffect(() => {
        const fetchData = () => {
            //call API here

        }
        fetchData();
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, category: string): void => {
        history.push({ pathname: `./items/${category}` })
    }
    return (
        <div className="homepage">
            <Carousel className="homepage-carousel" autoplay>
                {tempData2.map(item => {
                    return <div className="homepage-carousel-test">
                        <h3>{item.number}</h3>
                    </div>
                })}
            </Carousel>
            <div className="homepage-item-brands">
                <h1>BIGGEST DEALS ON TOP BRANDS</h1>
                <div className="homepage-item-brands-container" >
                    <Row gutter={24} >
                        {tempData.map(item => {
                            return <Col xs={12} sm={12} md={8} lg={8} xl={6} xxl={4} >
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
            <Divider className="homepage-divider" dashed />
            <div className="homepage-item-categories">
                <h1>CATEGORIES TO BAG</h1>
                <div className="homepage-item-categories-container">
                    <Row gutter={24} style={{ margin: "0" }}>
                        {tempData.map(item => {
                            return <Col xs={12} sm={12} md={8} lg={6} xl={4} ><CustomCard param={item.cateogry} handleClick={handleClick} hoverable={false} styleName="cart-category-round" imageUrl={item.imageUrl} title={item.title} /></Col>
                        })}
                    </Row>
                </div>
            </div>
        </div>
    )
}