import React from 'react';

const Button = ({onClick,className,name}) =>{
    return (
        <button onClick={onClick} className={className}>{name}</button>
    )
}
export default Button;



