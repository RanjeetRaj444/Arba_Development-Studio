import React from 'react';
import { IoCart } from "react-icons/io5";
interface CartProps {
    count: number;
}

const CartLogo: React.FC<CartProps> = ({ count }) => {
    return (
        <div style={{ display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center", position: 'relative', marginRight: '10px', }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 15 15"
                fill="teal"
                stroke="teal"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <IoCart color='teal' />
            </svg>

            <span
                style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: 'green',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                }}
            >
                {count}
            </span>

        </div>
    );
};

export default CartLogo;
