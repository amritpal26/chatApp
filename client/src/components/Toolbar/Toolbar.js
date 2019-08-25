import React from 'react';

import './Toolbar.css'
export default function Toolabar(props){
    return(
        <div className='toolbar-container'>
            <div className='toolbar-title'>{ props.title }</div>
        </div>
    );
}