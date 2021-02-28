import React from 'react';
import { message, Skeleton } from 'antd';
import { useGetItemDetailsByIdQuery, useAddRemoveItemToWishlistMutation, AddOrRemove } from 'src/generated/graphql';
import { CustomCard } from '../CustomCard/CustomCard';
import { useHistory } from 'react-router-dom';
import './index.scss';
export interface ItemViewProps {
    itemId: string;
    category: string;
}

export const ItemView: React.FC<ItemViewProps> = ({ itemId, category }) => {
    const { data: item, loading: isLoading, refetch } = useGetItemDetailsByIdQuery({ variables: { itemId } })
    const [addOrRemoveItem] = useAddRemoveItemToWishlistMutation();
    const history = useHistory();
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, name?: string): void => {
        history.push({ pathname: `${category}/${id}$${name}` });
    }
    const handleClickStar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string, isStared: boolean) => {
        //TODO:: store userId in redux, if userId present add to wishlist otherwise (1. force user to login, 2.save temp user's data in redux including stared item)
        // temparory
        let action: AddOrRemove;
        if (isStared === false) {
            action = AddOrRemove['Remove']
        } else {
            action = AddOrRemove['Add']
        }
        addOrRemoveItem({ variables: { itemId: id, action } }).then(isUpdated => {
            if (!isUpdated || isUpdated.errors) {
                message.info('Unable to add to wishlist')
            } else if (isUpdated.data?.addRemoveItemToWishlist) {
                console.log('done', isUpdated)
                refetch();
            }
        })
    }
    if (isLoading) {
        return <div className="itemview-skeleton">
            <Skeleton />
        </div>
    }
    if (!item) {
        return <div>Error</div>
    }
    return (
        <CustomCard
            type={'item-preview'}
            param={item.getItemDetailsById.itemId}
            handleClick={handleClick}
            onClickStar={handleClickStar}
            hoverable={true}
            styleName="preview-card"
            imageUrl={item.getItemDetailsById.url}
            title={item.getItemDetailsById.brand}
            price={item.getItemDetailsById.inventory.price}
            stared={item.getItemDetailsById.isStared}
            description={item.getItemDetailsById.name} />
    );
}