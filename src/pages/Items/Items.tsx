import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { ALlitem } from './ALlitem';
import { ItemDetails } from './ItemDetails';
import { ItemsList } from './ItemsList';

interface ItemsProps {

}

export const Items: React.FC<ItemsProps> = ({ }) => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/default`} component={ALlitem} />
            <Route exact path={`${path}/:category/:id`} component={ItemDetails} />
            <Route exact path={`${path}/:category`} component={ItemsList} />
            <Redirect exact from={`${path}/`} to={`${path}/default`} />
        </Switch>
    );
}