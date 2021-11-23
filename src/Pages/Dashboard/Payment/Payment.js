import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51JyNBgGvt0Aiy3YJ4Asa50IYU68SfT94UJqLD4SVgLsqbfuItfN2Fbz9teLc9m6az938wsHLpyJanomsOnrJSoR900YeYiJOeo');

const Payment = () => {

    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    }, []);

    return (
        <div>
            <h3>Please pay for the {appointment?.patientName}  for {appointment?.serviceName}</h3>
            <p>Total Price: ${appointment?.price}</p>
            {appointment.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;