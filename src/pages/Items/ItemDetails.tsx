import React from 'react';
import { NavBreadcrumb } from 'src/components/Breadcrumb/Breadcrumb';

interface ItemDetailsProps {

}

export const ItemDetails: React.FC<ItemDetailsProps> = ({ }) => {
    return (
        <div className="item-details">
            <div className="item-details-breadcrumn">
                <NavBreadcrumb />
            </div>
        </div>
    );
}