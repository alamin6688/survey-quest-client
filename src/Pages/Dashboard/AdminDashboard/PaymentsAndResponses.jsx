import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentsAndResponses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments, isLoading: isPaymentsLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      return res.data;
    }
  });



  if (isPaymentsLoading ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h3 className="text-3xl text-center md:text-3xl font-extrabold mt-6 mb-8">Payments</h3>
        <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Amount</th>
              <th>Payment Method ID</th>
              <th>Email</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment,index) => (
              <tr key={payment._id}>
                <td>{index+1}</td>
                <td>{payment.amount}</td>
                <td>{payment.paymentMethodId}</td>
                <td>{payment.email}</td>
                <td>{new Date(payment.paymentAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

  );
};

export default PaymentsAndResponses;
