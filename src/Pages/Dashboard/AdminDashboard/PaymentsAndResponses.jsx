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
        <h3>Payments</h3>
        <table className="table">
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

  );
};

export default PaymentsAndResponses;
