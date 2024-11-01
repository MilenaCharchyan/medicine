// Menu.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import './style.scss';

export const Menu: React.FC = React.memo((): JSX.Element => {
    return (
        <div className="menu">
            <ul>
                <li><NavLink to={'/'}>Medicine</NavLink></li>
                <li><NavLink to={'/add-company'}>Add Company</NavLink></li>
                <li><NavLink to={'/companies'}>Companies</NavLink></li>
                <li><NavLink to={'/add-medicine'}>Add Medicine</NavLink></li>
            </ul>
        </div>
    );
});
