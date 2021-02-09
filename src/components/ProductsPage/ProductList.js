import React, {Component} from 'react';
import Product from './Product'
import Title from "../Header/Title";
import {storeProducts} from '../../data';
import {ProductConsumer} from "../../context";
import img from "../../2020Collection.jpg";
import img1 from "../../croppedLogo.jpg";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import Figure from "react-bootstrap/Figure";
import logo2 from "../../croppedLogo2.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.sortList = this.sortList.bind(this);
        this.filterHandler = this.filterHandler.bind(this)
        this.state = {
            products: storeProducts,
            filterChoice: 'all',
            sortChoice: 'new',
            typeChoice:'handmade',
            gender:'women',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({typeChoice: this.props.match.params.style})
    }

    handleChange(Event){
        let nam = Event.target.name;
        let val = Event.target.value;
        this.setState({
            ...this.state,
            [nam]: val
        })
    }

    filterType = (data) =>{
        switch ( this.state.typeChoice ){
            default:
                break;
            case 'ready-made':
                data = data.filter(product => product.info.type === 'ready-made')
                break;
            case 'handmade':
                data = data.filter(product => product.info.type === 'handmade')
                break;
            case 'apparel':
                data = data.filter(product => product.info.type === 'apparel')
        }
        return data;
    }

    sortList(Event){
        let sortChoice = Event.target.value;
        let data = this.state.sortChoice;

        switch ( sortChoice ){
            default:
                data = 'new'
                break;
            case 'priceLH':
                data = 'priceLH'
                break;
            case 'priceHL':
                data = 'priceHL'
                break;
            case 'AZ':
                data = 'AZ'
                break;
            case 'ZA':
                data = 'ZA'
                break;
        }

        this.setState({
            sortChoice: data
        })
    }

    filterHandler(Event){
        let filtChoice = Event.target.value;
        let data = this.state.filterChoice;

        switch ( filtChoice ){
            default:
                data = 'all'
                break;
            case 'tops':
                data = 'Top'
                break;
            case 'bottoms':
                data = 'bottom'
                break;
            case 'onePiece':
                data = 'One-Piece'
                break;
        }

        this.setState({
            filterChoice: data
        })
    }

    sortProducts = (data) =>{
        switch ( this.state.sortChoice ){
            default:
                data = data.sort((a,b)=> a.id < b.id ? 1 : -1);
                break;
            case 'priceLH':
                data = data.sort((a,b)=> a.info.price > b.info.price ? 1 : -1);
                break;
            case 'priceHL':
                data = data.sort((a,b)=> a.info.price < b.info.price ? 1 : -1)
                break;
            case 'AZ':
                data = data.sort((a,b)=> a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
                break;
            case 'ZA':
                data = data.sort((a,b)=> a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)
                break;
        }
    }

    filterProducts = (data) =>{

        data = data.filter(product => product.info.gender !== 'men')
        switch ( this.state.filterChoice ){
            default:
                break;
            case 'Top':
                data = data.filter(product => product.info.style === 'Top')
                break;
            case 'bottom':
                data = data.filter(product => product.info.style === 'bottom')
                break;
            case 'One-Piece':
                data = data.filter(product => product.info.style === 'One-Piece')
                break;
        }
        return data
    }

    render() {
        return (
            <React.Fragment>

                <div >
                    <div className="container h-100 w-75" >
                        <Row>

                        <Col xs={12} >
                            <div className="col-10 mx-auto m-4 text-center text-title mt-3">
                                <p className="mx-auto  font-bold" style={{fontFamily:'"Montserrat", sans-serif', color:'#1a1b1f', fontSize:'40px'}}>
                                    Shop
                                </p>
                            </div>

                            <Col xs={12} md={6} className="mb-4 p-2 " style={{float: 'left' }} >
                                <p className="d-none d-md-block"
                                   style={{letterSpacing:'1px',fontFamily:'"Montserrat", sans-serif', color:'BLACK', fontSize:'15px',opacity: "60%"}}>
                                    Womens {this.state.typeChoice}
                                </p>
                                <p className="text-center d-block d-md-none"
                                   style={{letterSpacing:'1px',fontFamily:'"Montserrat", sans-serif', color:'BLACK', fontSize:'15px',opacity: "60%"}}>
                                    Womens {this.state.typeChoice}
                                </p>
                            </Col>

                            <Col xs={12} md={3} className="mb-4" style={{float: 'right'}} >
                                <div className=" border   p-2 shadow-md" style={{background:"#f8f8f8" }}>
                                    <Col>
                                        <h5 className="text-uppercase text-muted"  style={{"width":"100%",fontFamily:'"Montserrat", sans-serif', color:'#1a1b1f'}}>
                                            <select id="sortList" defaultValue="new" className="text-muted" onChange={this.sortList}  style={{"width":"100%"}}>
                                                <option value="new" disabled>Sort</option>
                                                <option value="new">Newest</option>
                                                <option value="priceLH">Price: (Low to High)</option>
                                                <option value="priceHL">Price: (High to Low)</option>
                                                <option value="AZ">Name: A-Z</option>
                                                <option value="ZA">Name: Z-A</option>
                                            </select>
                                        </h5>
                                    </Col>
                                </div>
                            </Col>

                        <div className="row mx-auto w-100">
                            <ProductConsumer >
                                {(value)=>{
                                    this.sortProducts(value.products)
                                    let products = value.products;
                                    products = this.filterProducts(products)
                                    products = this.filterType(products)
                                    return (products.map( product =>{
                                            return <Product key={product.title} product={product}/>
                                                }))}}
                            </ProductConsumer>
                        </div>

                        </Col>

                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;