import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PackageCard.css';

const PackageCard = ({ p }) => {
    
    const { id, packageName, price, icon } = p;

    return (
        <Col xs={12} md={6} lg={4}>
            <div className="package-card text-center">
                <p style={{ fontSize: "60px", color: "#E74C3C" }}><i className={icon}></i></p>
                <h3>{packageName}</h3>
                <h5>Price: $ {price}</h5>
                <Link to={`/payment/${id}`}><button className='registerBtn' style={{fontSize: "16px", marginTop: "7px"}}>Buy Now</button></Link>
            </div>
        </Col>
    );
};

export default PackageCard;