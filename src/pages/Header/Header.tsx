import React, { useState } from 'react';
import { Avatar, Dropdown, Drawer, message, Menu, Row, Col, Input, Button } from 'antd';
import './index.scss';
import "antd/dist/antd.css";
import { UserOutlined, NotificationOutlined, StarOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { setAccessToken } from 'src/accessToken';
import { useLogoutUserMutation, useUserDetailsQuery } from 'src/generated/graphql';
import { Link, useHistory } from 'react-router-dom';

interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {
    const { data, loading } = useUserDetailsQuery()
    const [logoutUser, { client }] = useLogoutUserMutation()
    const [isVisible, setVisible] = useState<boolean | undefined>(false);
    const history = useHistory();
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

    const rootSubmenuKeys: string[] = ['1', '2', '3'];
    const [drawerOpenKeys, setdrawerOpenKeys] = useState<string[]>([]);

    const handleOpenChange = (keys: any): void => {
        const latestOpenKey: string = keys.find((key: string) => drawerOpenKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setdrawerOpenKeys(keys);
        } else {
            setdrawerOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };


    interface MenuClickEventHandlerProps {
        key: React.Key;
        keyPath: React.Key[];
        item: React.ReactInstance;
        domEvent: React.MouseEvent<HTMLElement>;
    }

    const onDrawerOptionClick = (key: MenuClickEventHandlerProps): void => {
        onClick(key)
        onClose()
    }

    const onClick = (key: MenuClickEventHandlerProps): void => {
        message.info(`Click on item ${key.key}`);
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

    const menuOption = <>
        <Menu.SubMenu key="1" title="Topwear ">
            <Menu.Item key="T-Shirts">T-Shirts</Menu.Item>
            <Menu.Item key="Casual Shirts">Casual Shirts</Menu.Item>
            <Menu.Item key="Formal Shirts">Formal Shirts</Menu.Item>
            <Menu.Item key="Sweatshirts">Sweatshirts</Menu.Item>
            <Menu.Item key="Sweaters">Sweaters</Menu.Item>
            <Menu.Item key="Jackets">Jackets</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="2" title="Bottomwear ">
            <Menu.Item key="Jeans" >Jeans</Menu.Item>
            <Menu.Item key="Casual Trousers" >Casual Trousers</Menu.Item>
            <Menu.Item key="Formal Trousers" >Formal Trousers</Menu.Item>
            <Menu.Item key="Track Pants & Joggers" >Track Pants & Joggers</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="3" title="Footwear ">
            <Menu.Item key="Sports Shoes">Sports Shoes</Menu.Item>
            <Menu.Item key="Casual Shoes">Casual Shoes</Menu.Item>
            <Menu.Item key="Formal Shoes">Formal Shoes</Menu.Item>
            <Menu.Item key="Sneakers">Sneakers</Menu.Item>
            <Menu.Item key="Sandals & Floaters">Sandals & Floaters</Menu.Item>
        </Menu.SubMenu>
    </>

    let userMenuOption: any = null;

    if (loading || !data || !data.getUserDetails) {
        userMenuOption = <>
            <Menu.Item key="login" ><Link to="/login">Log in</Link></Menu.Item>
            <Menu.Item key="signin"><Link to="/register">register</Link></Menu.Item>
        </>;
    } else {
        userMenuOption = <>
            <Menu.Item key="login" >{data.getUserDetails.email}</Menu.Item>
            <Menu.Item key="Casuals">Profile</Menu.Item>
            <Menu.Item key="logout"><Button style={{ width: "100%" }} onClick={e => logOutUser(e)}>log out</Button></Menu.Item>
        </>;
    }

    return (
        <>
            <Row className="header" align="middle">
                <Col className="gutter-row" xs={{ span: 10, offset: 0 }} sm={{ span: 10, offset: 4 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }} xxl={{ span: 6, offset: 2 }} >
                    <Row>
                        <Col xs={{ span: 3, offset: 3 }} sm={{ span: 0, offset: 0 }} md={{ span: 0, offset: 0 }} lg={{ span: 0, offset: 0 }} xl={{ span: 0, offset: 0 }}>
                            <MenuOutlined onClick={showDrawer} />
                        </Col>
                        <Col xs={{ span: 12, offset: 2 }} sm={{ span: 7, offset: 0 }} md={{ span: 7, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 8, offset: 0 }}>
                            <div style={{ color: "#000" }}>Fashion</div>
                        </Col>
                        <Col xs={{ span: 0, offset: 0 }} sm={{ span: 3, offset: 2 }} md={{ span: 3, offset: 2 }} lg={{ span: 2, offset: 3 }} xl={{ span: 2, offset: 3 }}>
                            <Dropdown overlay={<Menu onClick={onClick}>{menuOption}</Menu>}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Men
                                </a>
                            </Dropdown>
                        </Col>
                        <Col xs={{ span: 0, offset: 0 }} sm={{ span: 3, offset: 2 }} md={{ span: 3, offset: 2 }} lg={{ span: 2, offset: 3 }} xl={{ span: 2, offset: 3 }}>
                            <Dropdown overlay={<Menu onClick={onClick}>{menuOption}</Menu>}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Women
                                </a>
                            </Dropdown>
                        </Col>
                        <Col xs={{ span: 0, offset: 0 }} sm={{ span: 3, offset: 4 }} md={{ span: 3, offset: 4 }} lg={{ span: 2, offset: 4 }} xl={{ span: 2, offset: 4 }}>
                            <Dropdown overlay={<Menu onClick={onClick}>{menuOption}</Menu>}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Kids
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row header-search-box" xs={{ span: 0, offset: 0 }} sm={{ span: 0, offset: 0 }} md={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 3 }} xl={{ span: 8, offset: 3 }} xxl={{ span: 8, offset: 4 }}>
                    <Input.Search allowClear placeholder="Search" onSearch={onSearch} />
                </Col>
                <Col className="gutter-row" xs={{ span: 10, offset: 4 }} sm={{ span: 4, offset: 4 }} md={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 1 }} xl={{ span: 4, offset: 1 }} xxl={{ span: 3, offset: 1 }} >
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
                            <Avatar shape="square" className="header-icon" icon={<StarOutlined onClick={onClickCart} />} />
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