import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import './index.scss'

interface NavBreadcrumbProps {
    url?: string;
}

export const NavBreadcrumb: React.FC<NavBreadcrumbProps> = ({ url }) => {
    const { pathname } = useLocation();
    const pathSnippets = pathname.split('/').filter(i => i);
    let extraBreadcrumbItems: Array<JSX.Element> = [];
    pathSnippets.forEach((_, index) => {
        let url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        let clickAableLink = url
        if (url === '/items') {
            clickAableLink = 'Items'
            url = '/items/default'
        } else if (pathSnippets[index] === 'default') {
            return
        }
        else if (url === pathname) {
            clickAableLink = pathSnippets.splice(-1, 1).toString();
            if (clickAableLink.startsWith('0x')) {
                clickAableLink = clickAableLink.split('$')[1]
            }

        } else {
            clickAableLink = clickAableLink.split('/').splice(-1, 1).toString();
        }
        extraBreadcrumbItems.push(
            <Breadcrumb.Item key={url}>
                <Link to={url}>{clickAableLink}</Link>
            </Breadcrumb.Item>
        );
    })
    const breadcrumbItems = [
        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)
    return (
        <Breadcrumb className="breadcrumb">
            {breadcrumbItems}
        </Breadcrumb>
    );
}