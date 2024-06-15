import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ParticipateDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data: participates = [] } = useQuery({
    queryKey: ["participates"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/participates`);
      return res.data;
    },
  });
  const clickedParticipates = participates.filter(participate => participate.surveyId === id);

console.log(clickedParticipates)


  return (
    <div className="w-full py-8 px-4">
      <h2 className="text-3xl text-center md:text-3xl font-extrabold mb-8">Participate Details</h2>
      <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-gray-200 text-lg font-bold text-black">
            <th>Serial No</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">User Email</th>
            <th className="px-4 py-2">Vote</th>
          </tr>
        </thead>
        <tbody>
          {clickedParticipates?.map((participate,ind) => (
            <tr key={participate._id}>
              <td>{ind+1}</td>
              <td className="border px-4 py-2">{participate.votedUserName}</td>
              <td className="border px-4 py-2">{participate.votedUserEmail}</td>
              <td className="border px-4 py-2">{participate.usersVote}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
};

export default ParticipateDetails;
