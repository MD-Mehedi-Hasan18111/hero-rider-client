import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../Shared/Navigation/Navigation";
import "./Payment.css";
import { Container } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../hooks/useAuth";


const stripePromise = loadStripe('pk_test_51JwJT6B3oKXz2yuUGAr9IdGCCc8dwLvTiITJpaLEpUPJf4QOEG7ujvK7aeb5aXudUNtcZUMvBdEHdN9H3bI547Ht00conhX2XW');

const Payment = () => {
  const [packages, setPackages] = useState([]);
    const { id } = useParams();
    const { userProfileInfo } = useAuth();

  useEffect(() => {
    fetch("/packages.json")
      .then((res) => res.json())
      .then((data) => setPackages(data));
  }, []);

  const item = packages.find((p) => p.id == id);

//   console.log(item);
    
    const paymentObj = { id: userProfileInfo._id, name: userProfileInfo.name, email: userProfileInfo.email, item: item?.packageName, price: item?.price };

  return (
    <div>
      <Navigation />
      <Container className="mt-4 text-center">
        <div className="text-center mb-4">
          <h2>{item?.packageName}</h2>
          <h4>Price: ${item?.price}</h4>
        </div>
        {item?.price && <Elements stripe={stripePromise}>
          <CheckoutForm paymentObj={paymentObj} />
        </Elements>}
      </Container>
    </div>
  );
};

export default Payment;
