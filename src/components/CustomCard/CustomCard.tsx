import React from 'react';
import { Card } from 'antd';
import './index.scss';
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';

export interface CommonCardProps {
    param: string;
    imageUrl: string;
    title: string;
    description?: string;
    styleName?: string;
    hoverable: boolean;
    type?: string;
    price?: number;
    stared?: boolean | undefined | null;
}
export interface CustomCardProps extends CommonCardProps {
    // param: string;
    // imageUrl: string;
    // title: string;
    // description?: string;
    // styleName?: string;
    // hoverable: boolean;
    // type?: string;
    // price?: number;
    // stared?: boolean | undefined | null;
    handleClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>, param: string, option?: string) => void);
    onClickStar?: ((event: React.MouseEvent<HTMLSpanElement, MouseEvent>, param: string) => void);
}

export const CustomCard: React.FC<CustomCardProps> = ({ param, imageUrl, title, description, styleName, hoverable, type, price, stared, handleClick, onClickStar }) => {
    return (
        <Card className={`${styleName}`}
            bordered={false}
            hoverable={hoverable}
            onClick={e => { handleClick(e, param, title) }}
            cover={<img className={`${styleName}-image`} alt={title} src={imageUrl} />
            }
        >
            <div className={`${styleName}-body`}>
                <div>
                    <Card.Meta description={description} title={title} />
                    {
                        type === "item-preview" &&
                        <Card.Meta className={`${styleName}-body-extra`} title={`Rs. ${price}`} />
                    }
                </div>
                {
                    type === "item-preview" && onClickStar &&
                    <div className={`${styleName}-body-star`} >
                        {
                            stared ?
                                <HeartFilled className={`${styleName}-body-star-filled`} onClick={e => { e.stopPropagation(); onClickStar(e, param) }} />
                                :
                                <HeartTwoTone onClick={e => { e.stopPropagation(); onClickStar(e, param) }} twoToneColor="#eb2f96" />
                        }
                    </div>
                }

            </div>
        </Card >
    );
}