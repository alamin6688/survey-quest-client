import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const CheckoutFrom = ({ currentUser, toPay}) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccessfull, setPaymentSuccessfull] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: currentUser.email,
            },
        });

        if (error) {
            console.error(error);
            setIsProcessing(false);
            return;
        }

        try {
            const paymentData = {
                amount: toPay,
                paymentMethodId: paymentMethod.id,
                email: currentUser.email,
                paymentAt: new Date().toISOString().split('T')[0],
            }
            const response = await axiosPublic.post('/payments', paymentData);

            if (response.data) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setPaymentSuccessfull(true)
                setTimeout(() => {
                    navigate(`/`)
                }, 2000);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Payment failed!",
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
        }

        setIsProcessing(false);
    };

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-success text-white mt-5 font-semibold" type="submit" disabled={!stripe || paymentSuccessfull}>
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutFrom;