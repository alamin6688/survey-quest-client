
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payments = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();


  const { data: users = [], } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
          const res = await axiosPublic.get('/users');
          return res.data;
      }
  });

  const currentUser = users.find(userDb => userDb.email === user.email);
const toPay=100;

  return (
    <div className="min-h-screen bg-[#1F2937] mt-6 mb-16 pt-8 rounded-xl">
      <h2 className="text-4xl text-white font-extrabold text-center">
        Payment
      </h2>
      <p className="w-full text-[16px] text-gray-200 md:w-3/4 mx-auto text-center mt-4">
        Make your payment to be our Pro-Member/Pro-User. You will get some extra
        benifits. Stay connected with usfor more offers
      </p>
      <h1 className="text-white">Pay $100 to Get Pro Membership</h1>

      <div>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutFrom currentUser={currentUser} toPay={toPay}></CheckoutFrom>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payments;
