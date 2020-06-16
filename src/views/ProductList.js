import React, {Component} from 'react';
import Product from '../components/Product'
import Title from "../components/Title";
import {storeProducts} from '../data';
import {ProductConsumer} from "../context";

class ProductList extends Component {
    state={
        products:storeProducts
    }

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="summer 2020" title="collection"/>

                        <div className="row">
                            <ProductConsumer>
                                {(value)=>{
                                    return value.products.map( product =>{
                                        return <Product key={product.id} product={product}/>
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;