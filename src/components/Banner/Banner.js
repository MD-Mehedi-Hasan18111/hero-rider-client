import React from 'react';
import './Banner.css';
import { Col, Container, Fade, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="banner-area">
            <Container>
                <Row className="banner-intro">
                    <Col xs={12} md={6} lg={6}>
                        <h1>Make Ride Possible With Hero Rider!</h1>
                        <p>A rider is someone who rides a horse, a bicycle, or a motorcycle as a hobby or job. Motorcycles and cars may share the road, but riding a motorcycle and driving a car are very different experiences. A rider is someone who rides a horse, a bicycle, or a motorcycle as a hobby or job.</p>
                        <Link to="/registerRider"><button className="readBtn">Join as Rider</button></Link>
                        <Link to="/registerLearner"><button className="readBtn ms-3">Join as Learner</button></Link>
                    </Col>
                    <Col xs={12} md={6} lg={6}>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Banner;