import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";

const ReportedSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [currentReports, setCurrentReports] = useState([]);
  const { data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reports`);
      return res.data;
    },
  });

  useEffect(() => {
    if (reports.length) {
      const myReports = reports.filter((survey) => survey.reportedUser === user?.email);
      setCurrentReports(myReports);
    }
  }, [reports,user?.email]);
  console.log(currentReports)
  return (
    <>
      <div className="w-full py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Reported Surveys</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-lg font-bold text-black">
            <th className="px-4 py-2">Reported Text</th>
            <th className="px-4 py-2">Reported User</th>
            <th className="px-4 py-2">Survey ID</th>
          </tr>
        </thead>
        <tbody>
        {
        currentReports.map((cuurentReport)=>(
            <tr key={cuurentReport._id}>
                <td className="border px-4 py-2">{cuurentReport.reportedText}</td>
                <td className="border px-4 py-2">{cuurentReport.reportedUser}</td>
                <td className="border px-4 py-2">{cuurentReport.surveyId}</td>
              </tr>
        ))
        }
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ReportedSurveys;
