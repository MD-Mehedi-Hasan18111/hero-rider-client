import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Navigation from '../../Shared/Navigation/Navigation';
import PackageCard from '../PackageCard/PackageCard';
import './Packages.css';

const Packages = () => {

    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch("./packages.json")
            .then(res => res.json())
        .then(data => setPackages(data))
    }, [])
   
    return (
        <div>
            <Navigation />
            <Container className="my-5">
            <h2 className="fw-bold text-center">
              Our{" "}
              <span style={{ color: "#c0392b", fontStyle: "italic" }}>
                Packages
              </span>
                </h2>
                <Row className="mt-3">
                    {
                        packages.map(p => <PackageCard key={p.id} p={p} />)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Packages;