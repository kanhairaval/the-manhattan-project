import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CREATE_PAYMENT_INTENT } from '../utils/mutations';
import { CURRENT_USER } from '../utils/queries';
import '../components/css/donate.css';

const stripePromise = loadStripe('pk_test_51MsSgMCbrULQn23mI6Wrnyh7PUeEOlYZOXELM9CNKGd7IOzXJQcufBHTDnOZrW7AFH1irs2JaCArUOYVsysgoXIk00gkxXDlV9');

const StripeCheckoutForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
    const {loading, error, data} = useQuery(CURRENT_USER);
    const me = data?.me;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [
                {
                  id: 'item-1',
                  price: 2000,
                  quantity: 1,
                },
              ],
            }),
          });
          console.log('Response from server:', response);
        const {error, paymentIntent} = await createPaymentIntent({
            variables: {
                amount: 500,
                currency: 'usd',
            },
        });
        if (error) {
            setErrorMessage(error.message);
        } else {
            const {client_secret, id} = paymentIntent;
            const stripe = await stripePromise;
            const {error} = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: {
                        number: '4242424242424242',
                        exp_month: 12,
                        exp_year: 2023,
                        cvc: '123',
                    },
                },
            });
            if (error) {
                setErrorMessage(error.message);
            } else {
                console.log('Payment successful with PaymentIntent ${id}!');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error! ${error.message}</div>;
    }

    if (!me){
        return <div>Must be logged in to donate!</div>;
    }

    return (
        <div className="donate-container">
            <h1 className="donate-title">Donate!</h1>
            <Elements stripe={stripePromise}>
                <form className="donate-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className="form-label">
                        Card Number: 
                        <input placeholder="1111-2222-3333-4444" className="form-input" type="text" />
                    </label>
                    <label className="form-label">
                        Expiration Month: 
                        <input placeholder="06" className="form-input" type="text" />
                    </label>
                </div>
                <div className="form-row">
                    <label className="form-label">
                        Expiration Year: 
                        <input placeholder="2025" className="form-input" type="text" />
                    </label>
                    <label className="form-label">
                        CVC: 
                        <input placeholder="727" className="form-input" type="text" />
                    </label>
                </div>
                    <label className="form-label">
                        Zip Code: 
                        <input placeholder="M4S 1C1" className="form-input" type="text" />
                    </label>
                <div className="form-row">
                    <label className="form-label">
                        Donation Amount: 
                        <input placeholder="$20" className="form-input" type="text" />
                    </label>
                </div>
                <div className="form-row">
                    <button className="form-button" type="submit">Donate</button>
                </div>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
            </Elements>
        </div>
    );
};

export default StripeCheckoutForm;



