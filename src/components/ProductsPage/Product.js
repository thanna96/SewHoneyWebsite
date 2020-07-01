import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {ProductConsumer} from "../../context";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: ''
        }
    }

    render() {
        const {id, title, info} = this.props.product;
        return (
            <ProductWrapper className="col-6 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">

                    <ProductConsumer>
                        {value=>(
                    <div className="img-container p-0"
                         onClick={()=>value.handleDetail(id,title)}>
                        <Link to="/details">
                            <img src={"https://s3.amazonaws.com/sew-honey-bucket/img/"+info.img[0]} id="imgTest" alt="product" className="card-img-top"/>
                        </Link>

                        <button className="cart-btn" disabled={!!info.inCart}
                                onClick={()=>{
                                    value.openModal(id,title);
                        }}>
                            {info.inCart?(<p className="text-capitalize mb-0" disabled>{" "}in cart</p>
                            ):(
                                <div>Add to Cart <FontAwesomeIcon icon={ faShoppingCart }/></div>)}
                        </button>
                    </div>)}
                    </ProductConsumer>

                    {/* Card Footer */}
                    <div className="card-footer d-flex justify-content-center">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                    </div>
                    <div className="card-footer d-flex justify-content-center">
                        <h5 className="font-italic mb-0">
                            <span className="mr-1">$</span>
                            {info.price}
                        </h5>
                    </div>

                </div>
            </ProductWrapper>
        );
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id:PropTypes.number,
        title:PropTypes.string,
        info: PropTypes.shape(
            {
                img:PropTypes.array,
                price:PropTypes.number,
                inCart:PropTypes.bool
            }
        ),
    }).isRequired
}

const ProductWrapper = styled.div`
    .card{
        border-color: transparent;
        transition: all 0.5s linear;
    }
    .card-footer{
        background: transparent;
        border-top: transparent;
        font-family: 'Noto Sans JP', sans-serif;
        font-size: 1rem;
    }
    &:hover{
        .card{
            border:0.04rem solid rgba(0,0,0,0.2);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
        }
        .card-footer{
            background: rgba(247,247,247);
        }
    }
    .img-container{
        position: relative;
        overflow: hidden;
    }
    .card-img-top{
        transition: all .25s linear;
    }
    .img-container:hover .card-img-top{
        transform: scale(1.1);
    }
    .cart-btn{
        position: absolute;
        bottom: 0;
        right:0;
        padding: 0.2rem 0.4rem;
        background: transparent;
        border:none;
        color:var(--mainWhite);
        font-size:1.4rem;
        border-radius:0.5 0 0 0;
        transform: translate(100%,100%);
        transition: all .25s linear;
    }
    .img-container: hover .cart-btn{
        transform: translate(0,0);
    }
    .cart-btn hover{
        cursor: pointer;
    }
`;

export default Product;