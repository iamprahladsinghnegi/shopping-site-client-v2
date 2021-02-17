import { Divider } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavBreadcrumb } from 'src/components/Breadcrumb/Breadcrumb';
import { ListView } from 'src/components/ListView/ListView';

interface ALlitemProps {

}


export const ALlitem: React.FC<ALlitemProps> = ({ }) => {
    const history = useHistory();
    const temp = [
        {
            title: `Jeans`,
            item: [
                { param: "0x123g1j3hj21g3j21g21ydx1", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "HRX Jeans", description: "Men Skinny Fit Jeans", price: 4012, stared: true, hoverable: false },
                { param: "0x123g1j3hj21g3j21g21ydx11", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "Here & Now Jeans", description: "Men Skinny Fit Jeans", price: 4012, stared: true, hoverable: false },
                { param: "0x123g1j3hj21g3j21g21ydx12", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "HRX Jeans-2", description: "Men Skinny Fit Jeans", price: 4012, stared: true, hoverable: false },
                { param: "0x123g1j3hj21g3j21g21ydx13", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "HRX Jeans-3", description: "Men Skinny Fit Jeans", price: 4012, stared: true, hoverable: false },
                { param: "0x123g1j3hj21g3j21g21ydx14", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "HRX Jeans-4", description: "Men Skinny Fit Jeans", price: 4012, stared: true, hoverable: false },
                { param: "0x123g1j3hj21g3j21g21ydx15", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "HRX Jeans-5", description: "Men Skinny Fit Jeans", price: 4012, stared: true, hoverable: false },
                { param: "0x123g1j3hj21g3j21g21ydx16", imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "HRX Jeans-6", description: "Men Skinny Fit Jeans", price: 4012, stared: true, hoverable: false },
            ],
        }
    ]


    const onClickList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: string) => {
        history.push({ pathname: `./${category}` })
    }

    const allCatelogries = ['Jeans', 'Shirt', 'T-Shirt', 'Jogger']

    return (
        <div className="item-categories">
            <div className="item-categories-breadcrumb">
                <NavBreadcrumb />
            </div>
            <div className="item-categories-content">
                {
                    allCatelogries.map(item => {
                        return <ListView
                            dataSource={temp[0].item}
                            onClickList={onClickList}
                            category={item}
                        />
                    })
                }
            </div>
        </div >
    );
}