
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentsAndResponses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments, isLoading: isPaymentsLoading, refetch: refetchPayments } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      return res.data;
    }
  });

  const { data: responses=[], isLoading: isResponsesLoading, refetch: refetchResponses } = useQuery({
    queryKey: ['responses'],
    queryFn: async () => {
      const res = await axiosSecure.get('/responses');
      return res.data;
    }
  });

  if (isPaymentsLoading || isResponsesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Payments and Responses</h2>
      <button onClick={refetchPayments}>Refetch Payments</button>
      <button onClick={refetchResponses}>Refetch Responses</button>
      <div>
        <h3>Payments</h3>
        <ul>
          {payments?.map(payment => (
            <li key={payment._id}>{payment.amount}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Responses</h3>
        <ul>
          {responses?.map(response => (
            <li key={response._id}>{response.answer}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentsAndResponses;
