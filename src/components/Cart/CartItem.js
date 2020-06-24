import React from 'react';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function CartItem({item,value}) {
    const{id,title,info} = item;
    const {increment,decrement,removeItem} = value;
    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={info.img} style={{width:'5rem',height:'6rem'}} className="img-fluid" alt="product"/>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>{title}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>{info.price}
            </div>

            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1" onClick={()=>decrement(id)}>-</span>
                        <span className="btn btn-black mx-1">{info.count}</span>
                        <span className="btn btn-black mx-1" onClick={()=>increment(id)}>+</span>
                    </div>
                </div>
            </div>
            {/*  */}

            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={()=>removeItem(id)}>
                    <FontAwesomeIcon icon={ faTrash }/>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <strong> item total : $ {info.total}</strong>
            </div>


        </div>
    );
}