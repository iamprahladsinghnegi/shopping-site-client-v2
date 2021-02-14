import React from 'react';
import { NavBreadcrumb } from 'src/components/Breadcrumb/Breadcrumb';

interface ALlitemProps {

}

export const ALlitem: React.FC<ALlitemProps> = ({ }) => {
    return (
        <div>
            <NavBreadcrumb />
            all item
        </div>
    );
}