import { Col, Layout, PageHeader, Row, Checkbox, Divider, Affix, Drawer, Select, List } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useState } from 'react';

import { useParams, useHistory, useLocation } from 'react-router-dom';
import { NavBreadcrumb } from 'src/components/Breadcrumb/Breadcrumb';
import { CheckCircleTwoTone } from '@ant-design/icons';

import './index.scss';
import { valueType } from 'antd/lib/statistic/utils';
import { useGetAllItemIdsBySubCategoryWithFilterQuery } from 'src/generated/graphql';
import { ItemView } from 'src/components/ItemView/ItemView';
import { SORT_OPTIONS } from '../../constants/AppConstanat'

interface ItemsListRouterProps {
    category: string
}

export const ItemsList: React.FC<ItemsListRouterProps> = ({ }) => {
    const history = useHistory();
    const { pathname } = useLocation();
    const subCategory = pathname.split('/')[2]
    const [filterColor, setFilterColor] = useState<Array<string | number | boolean>>([]);
    const [filterCategory, setFilterCategory] = useState<Array<string | number | boolean>>([]);
    const [filterDiscount, setFilterDiscount] = useState<Array<string | number | boolean>>([]);
    const [filterPrice, setFilterPrice] = useState<Array<string | number | boolean>>([]);
    const [isVisible, setVisible] = useState<boolean | undefined>(false);
    const [drawerType, setDrawerType] = useState<string>('');
    const [sortBy, setSortBy] = useState<valueType>(0);
    const { category } = useParams<ItemsListRouterProps>();
    let fillterOption = {
        sort: SORT_OPTIONS[sortBy].key,
        color: [],
        price: [],
        category: [],
        discount: []
    }
    const { data: allitemIds, loading: itemIdsLoader, error: itemIdsError } = useGetAllItemIdsBySubCategoryWithFilterQuery({ variables: { subCategory, filterOptions: fillterOption } })

    if (itemIdsError) {
        history.replace('/items')
    }

    if (itemIdsLoader || !allitemIds) {
        return <>Loading data..............</>
    }

    const plainOptions = ['Printed', 'Checks', 'Damge'];
    const categoryOptions = plainOptions.map((item) => {
        return <><Checkbox value={item}>{item}</Checkbox><br /> </>
    })
    const onChange = (checkedValue: CheckboxValueType[], type?: string): void => {
        console.log('checked = ', type, checkedValue);
        if (type === 'color') {
            setFilterColor(checkedValue)
        } else if (type === 'category') {
            setFilterCategory(checkedValue)
        } else if (type === 'discount') {
            setFilterDiscount(checkedValue)
        } else {
            setFilterPrice(checkedValue)
        }
    }

    const pricePlainOptions = ["Rs. 134 to Rs. 3051", "Rs. 3051 to Rs. 5968", "Rs. 5968 to Rs. 8885", "Rs. 8885 to Rs. 11802"];
    const priceOptions = pricePlainOptions.map((item, index) => {
        return <><Checkbox value={index} >{item}</Checkbox><br /> </>
    });

    const colorPlainOptions = [
        "AliceBlue",
        "AntiqueWhite",
        "Aqua",
        "Aquamarine",
        "Azure",
        "Beige",
        "Bisque",
        "Black",
        "BlanchedAlmond",
        "Blue",
        "BlueViolet",
        "Brown",
        "BurlyWood",
        "CadetBlue",
        "Chartreuse",
        "Chocolate",
        "Coral",
        "CornflowerBlue",
        "Cornsilk",
        "Crimson",
        "Cyan",
        "DarkBlue",
        "DarkCyan",
        "DarkGoldenRod",
        "DarkGray",
        "DarkGrey",
        "DarkGreen",
        "DarkKhaki",
        "DarkMagenta",
        "DarkOliveGreen",
        "DarkOrange",
        "DarkOrchid",
        "DarkRed",
        "DarkSlateBlue",
        "DarkSlateGray",
        "DarkSlateGrey",
        "DarkTurquoise",
        "DarkViolet",
        "DeepPink",
        "DeepSkyBlue",
        "DimGray",
        "DimGrey",
        "DodgerBlue",
        "FireBrick",
        "FloralWhite",
        "ForestGreen",
        "Fuchsia",
        "Gainsboro",
        "GhostWhite",
        "Gold",
        "GoldenRod",
        "Gray",
        "Grey",
        "Green",
        "GreenYellow",
        "HoneyDew",
        "HotPink",
        "IndianRed",
        "Indigo",
        "Ivory",
        "MediumSeaGreen",
        "MediumSlateBlue",
        "MediumTurquoise",
        "MediumVioletRed",
        "MidnightBlue",
        "MintCream",
        "MistyRose",
        "Moccasin",
        "NavajoWhite",
        "Navy",
        "OldLace",
        "Olive",
        "OliveDrab",
        "Orange",
        "OrangeRed",
        "Orchid",
        "PaleGoldenRod",
        "PaleGreen",
        "PaleTurquoise",
        "PaleVioletRed",
        "PapayaWhip",
        "SeaShell",
        "Sienna",
        "Silver",
        "SkyBlue",
        "SlateBlue",
        "SlateGray",
        "SlateGrey",
        "Snow",
        "WhiteSmoke",
        "Yellow",
        "YellowGreen",
    ];
    const colorOptions = colorPlainOptions.map((item, index) => {
        return <><Checkbox value={item}><span className="label-color" style={{ backgroundColor: item }}></span>{item}</Checkbox><br /> </>
    });
    const discountPlanOption = [
        "10 % and above",
        "20 % and above",
        "30 % and above",
        "40 % and above",
        "50 % and above",
        "60 % and above",
        "70 % and above",
        "80 % and above"
    ]
    const discountOptions = discountPlanOption.map((item, index) => {
        return <><Checkbox value={index}>{item}</Checkbox><br /> </>
    });

    const resetFilters = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        setFilterColor([]);
        setFilterCategory([]);
        setFilterDiscount([]); // state contains index of discountPlanOption
        setFilterPrice([]);// state contains index of pricePlainOptions
    }
    const isClearOption = (filterColor.length === 0 && filterCategory.length === 0 && filterDiscount.length === 0 && filterPrice.length === 0) ? false : true

    const filterHeader: JSX.Element = <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
        <text>
            FILTERS
            </text>
        {isClearOption && <button style={{ border: 0, background: "transparent", outline: 'none' }} onClick={resetFilters}>Clear All</button>}
    </div>

    const filterOptions: JSX.Element = <>
        <div className="item-listing-layout-sider-content-category" >
            <text>
                CATEGORIES
            </text>
            <div className="item-listing-layout-sider-content-category-options">
                <Checkbox.Group value={filterCategory} onChange={e => { onChange(e, 'category') }} >
                    {categoryOptions}
                </Checkbox.Group>
            </div>
        </div>
        <Divider />
        <div className="item-listing-layout-sider-content-price" >
            <text>
                PRICE
                            </text>
            <div className="item-listing-layout-sider-content-price-options">
                <Checkbox.Group value={filterPrice} onChange={e => { onChange(e, 'price') }} >
                    {priceOptions}
                </Checkbox.Group>
            </div>
        </div>
        <Divider />
        <div className="item-listing-layout-sider-content-color" >
            <text>
                COLOR
                            </text>
            <div className="item-listing-layout-sider-content-color-options">
                <Checkbox.Group value={filterColor} onChange={e => { onChange(e, 'color') }} >
                    {colorOptions}
                </Checkbox.Group>
            </div>
        </div>
        <Divider />
        <div className="item-listing-layout-sider-content-discount" >
            <text>
                DISCOUNT RANGE
                            </text>
            <div className="item-listing-layout-sider-content-discount-options">
                <Checkbox.Group value={filterDiscount} onChange={e => { onChange(e, 'discount') }} >
                    {discountOptions}
                </Checkbox.Group>
            </div>
        </div>
    </>;
    const showDrawer = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, type: string): void => {
        setDrawerType(type)
        setVisible(true);
    };

    const onClose = (e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void => {
        setVisible(false);
    };

    const handleChange = (value: valueType): void => {
        console.log(value)
        if (sortBy === value) {
            return
        }
        setSortBy(value)
        if (drawerType === 'sort') {
            onClose();
        }
    }

    const sortOptions: JSX.Element = <>
        <text>
            SORT BY :
        </text>
        <Select value={sortBy} style={{ width: 200 }} onChange={handleChange}>
            {
                SORT_OPTIONS.map((item, index) => {
                    return <Select.Option value={index}>{item.label}</Select.Option>
                })
            }
        </Select>
    </>

    const drawerHeader: JSX.Element | string = drawerType === 'sort' ? "SORT BY" : filterHeader
    const drawerContent: JSX.Element =
        drawerType === 'sort' ?
            <List
                bordered
                dataSource={SORT_OPTIONS}
                renderItem={(item, index) => (
                    <List.Item onClick={e => { handleChange(index) }}>
                        {item.label}
                        {sortBy === index &&
                            <div style={{
                                float: "right",
                                textAlign: 'right'
                            }}>
                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                            </div>
                        }
                    </List.Item>
                )}
            />
            :
            <div className="item-listing-layout-sider-content" style={{ padding: '10px 20px' }}>
                {filterOptions}
            </div>

    return (
        <div className="item-listing">
            <div className="item-listing-breadcrumb" >
                <NavBreadcrumb />
            </div>
            <Layout className="item-listing-layout">
                <Layout.Sider className="item-listing-layout-sider" width={'15rem'}>
                    <div className="item-listing-layout-sider-content" style={{ padding: '10px 20px' }}>
                        {filterHeader}
                        <Divider />
                        {filterOptions}
                    </div>
                </Layout.Sider>
                <Layout.Content className="item-listing-layout-content">
                    <div className="item-listing-layout-content-main">
                        <PageHeader
                            className="item-listing-layout-content-main-header"
                            title={category}
                            extra={[sortOptions]}
                        />

                        <div className="item-listing-layout-content-main-items">
                            <Row style={{ margin: 0 }} gutter={24}>
                                {/* {tempData.map(item => {
                                    return <Col xs={12} sm={12} md={8} lg={8} xl={6} xxl={4} >
                                        <CustomCard
                                            type={'item-preview'}
                                            param={item.id}
                                            handleClick={handleClick}
                                            onClickStar={handleClickStar}
                                            hoverable={true}
                                            styleName="preview-card"
                                            imageUrl={item.imageUrl}
                                            title={item.title}
                                            price={item.price}
                                            stared={item.stared}
                                            description={item.description} />
                                    </Col>
                                })} */}
                                {allitemIds.getAllItemIdsBySubCategoryWithFilter.itemIds.map(item => {
                                    return <Col xs={12} sm={12} md={8} lg={8} xl={6} xxl={4} >
                                        <ItemView itemId={item} category={category} />
                                    </Col>
                                })}
                            </Row>
                        </div>

                    </div>

                    <Affix className="item-listing-layout-content-footer" offsetBottom={0} >
                        <button className="item-listing-layout-content-footer-content" onClick={e => { showDrawer(e, "sort") }} >
                            SORT
                        </button>
                        <button className="item-listing-layout-content-footer-content" onClick={e => { showDrawer(e, "filter") }}>
                            FILTER
                        </button>
                    </Affix>
                </Layout.Content>
            </Layout>
            <Drawer
                title={drawerHeader}
                placement={drawerType === 'sort' ? "bottom" : "right"}
                closable={false}
                onClose={onClose}
                visible={isVisible}
                bodyStyle={{ padding: 0 }}
                headerStyle={{ background: "lightblue" }}
                height={300}
            >
                {drawerContent}
            </Drawer>
        </div>
    );
}