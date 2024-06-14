import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const MyComments = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [currentComments, setCurrentComments] = useState([]);
    const { data: comments = [] } = useQuery({
      queryKey: ["comments"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/comments`);
        return res.data;
      },
    });
  
    useEffect(() => {
      if (comments.length) {
        const myComments = comments.filter((comment) => comment.commentedUser === user?.email);
        setCurrentComments(myComments);
      }
    }, [comments,user?.email]);
    console.log(currentComments)
    return (
        <div className="w-full py-8 px-4">
        <h2 className="text-2xl text-center md:text-3xl font-bold mb-8">My Commets</h2>
        <table className="table w-1/2 mx-auto md:w-full">
          <thead>
            <tr className="bg-gray-200 md:text-lg font-bold text-black">
              <th className="px-4 py-2">Survey ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Text</th>
            </tr>
          </thead>
          <tbody>
          {
          currentComments.map((cuurentComment)=>(
              <tr key={cuurentComment._id}>
                  <td className="border px-4 py-2">{cuurentComment.surveyId}</td>
                  <td className="border px-4 py-2">{cuurentComment.commentedUser}</td>
                  <td className="border px-4 py-2">{cuurentComment.commentedText}</td>
                </tr>
          ))
          }
          </tbody>
        </table>
      </div>
    );
};

export default MyComments;