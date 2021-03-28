import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Drawer, message, Menu, Row, Col, Input, Button } from 'antd';
import './index.scss';
import "antd/dist/antd.css";
import { UserOutlined, NotificationOutlined, ShoppingCartOutlined, SearchOutlined, MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { setAccessToken } from 'src/accessToken';
import { useGetAllCategoryAndSubCategoryNameQuery, useLogoutUserMutation, useUserDetailsQuery } from 'src/generated/graphql';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getHeaderText } from 'src/util';

interface HeaderProps {
}

interface MenuClickEventHandlerProps {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}

export const Header: React.FC<HeaderProps> = () => {
    const { data: userData, loading: userLoading } = useUserDetailsQuery()
    const [logoutUser, { client }] = useLogoutUserMutation()
    const [isVisible, setVisible] = useState<boolean | undefined>(false);
    const history = useHistory();
    const { pathname } = useLocation();
    const rootSubmenuKeys: string[] = ['1', '2', '3'];
    const [drawerOpenKeys, setdrawerOpenKeys] = useState<string[]>([]);
    const { data: categoryData, loading: categoryLoading } = useGetAllCategoryAndSubCategoryNameQuery();

    // const [currentWindow, setCurrentWindow] = useState(window.innerWidth);

    // useEffect(() => {
    //     window.addEventListener("resize", (ev) => {
    //         setCurrentWindow(window.innerWidth)
    //     })
    // }, []);

    if (userLoading || categoryLoading) {
        return <></>
    }
    console.log(categoryData)
    const showDrawer = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        setVisible(true);
    };

    const onClose = (e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void => {
        setVisible(false);
    };

    const logOutUser = (e: any) => {
        return logoutUser().then(res => {
            setAccessToken('');
            client.resetStore();
            history.push('./');
        })
    }

    const handleOpenChange = (keys: any): void => {
        const latestOpenKey: string = keys.find((key: string) => drawerOpenKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setdrawerOpenKeys(keys);
        } else {
            setdrawerOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onDrawerOptionClick = (key: MenuClickEventHandlerProps): void => {
        onClick(key)
        onClose()
    }

    const onClick = (key: MenuClickEventHandlerProps): void => {
        history.push(`/items/${key.key}`)
    };

    const onClickCart = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        history.push('/cart')
    }

    const onSearch = (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>): void => {
        console.log(value)
    }
    const onClickNotification = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        console.log('onClickNotification')
    }

    const drawerTitile = <>
        <div className="header-drawer-title">
            Profile
        </div>
    </>;

    let userMenuOption: any = null;

    if (!userData || !userData.getUserDetails) {
        userMenuOption = <>
            <Menu.Item key="login" ><Link to="/login">Log in</Link></Menu.Item>
            <Menu.Item key="signin"><Link to="/register">register</Link></Menu.Item>
        </>;
    } else {
        userMenuOption = <>
            <Menu.Item key="login" >{userData.getUserDetails.email}</Menu.Item>
            <Menu.Item key="Casuals">Profile</Menu.Item>
            <Menu.Item key="logout"><Button style={{ width: "100%" }} onClick={e => logOutUser(e)}>log out</Button></Menu.Item>
        </>;
    }

    let menuOption: JSX.Element[] | null = null;

    if (!categoryData || !categoryData.getAllCategoryAndSubCategoryName) {
        //use default menu
    } else {
        // let categories: JSX.Element[] = [];
        // categoryData.getAllCategoryAndSubCategoryName.forEach((element, index) => {
        //     let subCategories: JSX.Element[] = []
        //     element.subCategory.forEach(ele => {
        //         subCategories.push(<Menu.Item key={ele}>{ele}</Menu.Item>)
        //     })
        //     categories.push(<Menu.SubMenu key={index} title={element.category}>{subCategories}</Menu.SubMenu>)
        // })
        // menuOption = categories
        menuOption = categoryData.getAllCategoryAndSubCategoryName.map((element, index) => {
            return <Menu.SubMenu key={index} title={element.category}>{element.subCategory.map(ele => {
                return <Menu.Item key={ele}>{ele}</Menu.Item>
            })}</Menu.SubMenu>
        })
    }


    const handleBack = (): void => {
        history.goBack();
    }
    const headerIcon: JSX.Element = pathname === '/' ? <MenuOutlined onClick={showDrawer} /> : <ArrowLeftOutlined onClick={handleBack} />
    const headerText: string = getHeaderText(pathname);

    return (
        <>
            <Row className="header" align="middle">
                <Col className="gutter-row" xs={{ span: 10, offset: 0 }} sm={{ span: 16, offset: 2 }} md={{ span: 12, offset: 2 }} lg={{ span: 10, offset: 2 }} xl={{ span: 10, offset: 2 }} xxl={{ span: 9, offset: 2 }} >
                    <Row>
                        <Col xs={{ span: 3, offset: 3 }} sm={{ span: 0, offset: 0 }} md={{ span: 0, offset: 0 }} lg={{ span: 0, offset: 0 }} xl={{ span: 0, offset: 0 }} xxl={{ span: 0, offset: 0 }}>
                            {headerIcon}
                        </Col>
                        <Col xs={{ span: 12, offset: 2 }} sm={{ span: 0, offset: 0 }} md={{ span: 0, offset: 0 }} lg={{ span: 0, offset: 0 }} xl={{ span: 0, offset: 0 }} xxl={{ span: 0, offset: 0 }}>
                            <span>{headerText}</span>
                        </Col>
                        <Col xs={{ span: 0, offset: 2 }} sm={{ span: 4, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 4, offset: 0 }} xl={{ span: 4, offset: 0 }} xxl={{ span: 6, offset: 0 }}>
                            <span>Fashion</span>
                        </Col>
                        <Col xs={{ span: 0, offset: 0 }} sm={{ span: 20, offset: 0 }} md={{ span: 20, offset: 0 }} lg={{ span: 20, offset: 0 }} xl={{ span: 20, offset: 0 }} xxl={{ span: 18, offset: 0 }}>
                            <Menu style={{ background: 'transparent', border: 0, lineHeight: '24px' }} mode="horizontal" onClick={onClick}>{menuOption}</Menu>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row header-search-box" xs={{ span: 0, offset: 0 }} sm={{ span: 0, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }} xxl={{ span: 8, offset: 1 }}>
                    <Input.Search allowClear placeholder="Search" onSearch={onSearch} />
                </Col>
                <Col className="gutter-row" xs={{ span: 10, offset: 4 }} sm={{ span: 4, offset: 0 }} md={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 1 }} xl={{ span: 4, offset: 1 }} xxl={{ span: 3, offset: 1 }} >
                    <Row>
                        <Col xs={{ span: 6, offset: 5 }} sm={{ span: 6, offset: 0 }} md={{ span: 0, offset: 0 }} lg={{ span: 0, offset: 0 }} xl={{ span: 0, offset: 0 }} xxl={{ span: 0, offset: 0 }} >
                            <Avatar shape="square" className="header-icon" icon={<SearchOutlined onClick={onClickNotification} />} />

                        </Col>
                        <Col xs={{ span: 0, offset: 0 }} sm={{ span: 0, offset: 0 }} md={{ span: 6, offset: 2 }} lg={{ span: 4, offset: 2 }} xl={{ span: 4, offset: 3 }} xxl={{ span: 4, offset: 2 }} >
                            <Dropdown placement="bottomCenter" overlay={<Menu style={{ width: '200px' }} >{userMenuOption}</Menu>}>
                                <Avatar shape="circle" className="header-icon" icon={<UserOutlined />} />
                            </Dropdown>
                        </Col>
                        <Col xs={{ span: 6, offset: 0 }} sm={{ span: 6, offset: 3 }} md={{ span: 6, offset: 2 }} lg={{ span: 4, offset: 2 }} xl={{ span: 4, offset: 3 }} xxl={{ span: 4, offset: 2 }} >
                            <Avatar shape="square" className="header-icon" icon={<ShoppingCartOutlined onClick={onClickCart} />} />
                        </Col>
                        <Col xs={{ span: 6, offset: 0 }} sm={{ span: 6, offset: 3 }} md={{ span: 6, offset: 2 }} lg={{ span: 4, offset: 2 }} xl={{ span: 4, offset: 4 }} xxl={{ span: 4, offset: 2 }} >
                            <Avatar shape="square" className="header-icon" icon={<NotificationOutlined onClick={onClickNotification} />} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Drawer
                title={drawerTitile}
                placement={"left"}
                closable={false}
                onClose={onClose}
                visible={isVisible}
                bodyStyle={{ padding: 0 }}
                headerStyle={{ background: "lightblue" }}
            >
                <Menu mode="inline" onClick={onDrawerOptionClick} openKeys={drawerOpenKeys} onOpenChange={handleOpenChange} >
                    {menuOption}
                </Menu>
            </Drawer>
        </>
    );
};