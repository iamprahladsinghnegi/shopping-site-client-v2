import React from 'react';
import { List } from 'antd'
import { CustomCard, CommonCardProps } from '../CustomCard/CustomCard';
import './index.scss';
import { useHistory } from 'react-router-dom';


interface ListViewProps {
    category: string;
    dataSource: Array<CommonCardProps>;
    onClickList: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, params: string) => void;

}


export const ListView: React.FC<ListViewProps> = ({ category, dataSource, onClickList }) => {
    const history = useHistory();
    const header: JSX.Element = <div className="listview-header">
        <h3>{category}</h3>
        <button onClick={e => { onClickList(e, category) }} >{`View All >`}</button>
    </div>
    const handleOnClik = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, name?: string): void => {
        history.push({ pathname: `./${category}/${id}$${name}` })
    }
    return (
        <List className="listview"
            grid={{ gutter: 24, sm: 2, xs: 2, md: 4, lg: 4, xl: 6, xxl: 6 }}
            dataSource={dataSource}
            header={header}
            renderItem={(element: CommonCardProps) => (
                <List.Item
                    key={element.title}
                >
                    <CustomCard
                        hoverable={false}
                        type={'item-preview'}
                        param={element.param}
                        handleClick={handleOnClik}
                        styleName="preview-card"
                        imageUrl={element.imageUrl}
                        title={element.title}
                        price={element.price}
                        description={element.description} />
                </List.Item>
            )}
        />
    )
}

