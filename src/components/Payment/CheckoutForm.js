import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const CheckoutForm = ({paymentObj}) => {
    const { id, price, email, name, item } = paymentObj;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch("https://hidden-citadel-26432.herokuapp.com/create-payment-intent", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ price }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (!stripe || !elements) {
          return;
      }

      const card = elements.getElement(CardElement);
      if (card === null) {
          return;
      }

      setProcessing(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      // payment intent
      const { paymentIntent, error: IntentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
  
      if (error) {
          setError(error.message);
          setSuccess('');
      } else {
          setError('');
          setSuccess('Your Payment Successfully Processed.');
        //   console.log(paymentMethod);
          setProcessing(false);

          // store in the database
          const payment = {
            packageName: item,
            amount: paymentIntent.amount,
            transaction: paymentIntent.client_secret.slice('_secret')[0],
            created: paymentIntent.created,
            last4: paymentMethod.card.last4
          }
    
          fetch(`https://hidden-citadel-26432.herokuapp.com/payments/${id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(payment)
          })
            .then(res => res.json())
          .then(data => console.log(data))
      }  
      
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {processing ? <Spinner animation="border" /> : <button className="registerBtn" type="submit" disabled={!stripe || success}>
          Pay ${price}
        </button>}
          </form>
          {error && <p className="mt-4 text-danger">{ error}</p>}
          {success && <p className="mt-4 text-success">{ success}</p>}
    </div>
  );
};

export default CheckoutForm;
