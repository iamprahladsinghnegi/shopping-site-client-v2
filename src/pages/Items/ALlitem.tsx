import { Divider } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavBreadcrumb } from 'src/components/Breadcrumb/Breadcrumb';
import { ListView } from 'src/components/ListView/ListView';
import { useAllSubCategoriesWithItemQuery } from 'src/generated/graphql';

interface ALlitemProps {

}


export const ALlitem: React.FC<ALlitemProps> = ({ }) => {
    const { data, loading, error } = useAllSubCategoriesWithItemQuery();
    const history = useHistory();
    if (error) {
        history.push({ pathname: '/' });
    }
    if (loading || !data || !data.allSubCategoriesWithItem) {
        return <div>Loading....</div>
    }
    return (
        <div className="item-categories">
            <div className="item-categories-breadcrumb">
                <NavBreadcrumb />
            </div>
            <div className="item-categories-content">
                {
                    data.allSubCategoriesWithItem.map(ele => {
                        return <ListView
                            itemIds={ele.itemIds}
                            category={ele.subCategory}
                        />
                    })
                }
            </div>
        </div >
    );
}