import React from 'react';
import cl from './MenuToggle.module.css';

const MenuToggle = (props) => {
    const cls = [
        cl.menuToggle,
        'fa'
    ]

    if(props.isOpen === true){
        cls.push('fa-times');
        cls.push(cl.open)
    } else {
        cls.push('fa-bars')
    }
    return (
        <i className={cls.join(' ')}
           onClick={props.onToggle}>
        </i>
    );
};

export default MenuToggle;