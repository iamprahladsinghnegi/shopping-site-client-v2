import React from 'react';
import { List, Skeleton } from 'antd'
import { CustomCard } from '../CustomCard/CustomCard';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useGetAllItemsByIdsQuery } from '../../generated/graphql';

interface ListViewProps {
    category: string;
    itemIds: Array<string>;
}

export const ListView: React.FC<ListViewProps> = ({ category, itemIds }) => {
    const history = useHistory();
    const { data, loading, error } = useGetAllItemsByIdsQuery({ variables: { itemIds } });

    if (error) {
        return <Skeleton />
    }
    if (loading || !data || !data.getAllItemsByIds) {
        return <Skeleton />
    }

    const onClickList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        history.push({ pathname: `./${category}` })
    }
    const header: JSX.Element = <div className="listview-header">
        <h3>{category}</h3>
        <button onClick={e => { onClickList(e) }} >{`View All >`}</button>
    </div>
    const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, name?: string): void => {
        history.push({ pathname: `./${category}/${id}$${name}` })
    }

    return (
        <List className="listview"
            grid={{ gutter: 24, sm: 2, xs: 2, md: 4, lg: 4, xl: 6, xxl: 6 }}
            dataSource={data.getAllItemsByIds}
            header={header}
            renderItem={(element) => (
                <List.Item
                    key={element.name}
                >
                    <CustomCard
                        hoverable={false}
                        type={'item-preview'}
                        param={element.itemId}
                        handleClick={handleOnClick}
                        styleName="preview-card"
                        imageUrl={element.url}
                        title={element.brand}
                        price={element.price}
                        description={element.name} />
                </List.Item>
            )}
        />
    )
}

