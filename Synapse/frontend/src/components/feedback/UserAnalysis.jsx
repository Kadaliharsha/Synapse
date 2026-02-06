import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import Cookies from "js-cookie";
import GlassCard from "../common/GlassCard";

const Analysis = () => {
  const [weeklyPoints, setWeeklyPoints] = useState([0, 0, 0, 0, 0, 0, 0]); // Mon to Sun
  const [totalPoints, setTotalPoints] = useState(0);
  const [status, setStatus] = useState("Consult Therapist");
  const [statusColor, setStatusColor] = useState("red");
  const navigate = useNavigate();

  const getStatus = (avgPoints) => {
    if (avgPoints > 75) return "Good";
    if (avgPoints > 50) return "Needs Improvement";
    return "Consult Therapist";
  };

  const getColor = (status) => {
    if (status === "Good") return "emerald";
    if (status === "Needs Improvement") return "amber";
    return "rose";
  };

  useEffect(() => {
    const fetchData = async () => {
      let email;
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        email = JSON.parse(storedUser).email;
      } else {
        email = null;
      }

      if (!email) return;

      try {
        const response = await API.get(`/user/feedback/${email}`);
        if (response.status === 200) {
          const feedbackData = response.data;
          let points = [0, 0, 0, 0, 0, 0, 0];

          const today = new Date();
          const currentWeekStart = new Date(today);
          currentWeekStart.setDate(today.getDate() - today.getDay() + 1);
          currentWeekStart.setHours(0, 0, 0, 0);

          const currentWeekEnd = new Date(currentWeekStart);
          currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
          currentWeekEnd.setHours(23, 59, 59, 999);

          const formatDate = (date) => date.toISOString().split("T")[0];
          const currentWeekStartFormatted = formatDate(currentWeekStart);
          const currentWeekEndFormatted = formatDate(currentWeekEnd);

          const scores = feedbackData.scores;

          Object.entries(scores).forEach(([date, score]) => {
            if (date >= currentWeekStartFormatted && date <= currentWeekEndFormatted) {
              const feedbackDate = new Date(date);
              const dayIndex = feedbackDate.getDay() === 0 ? 6 : feedbackDate.getDay() - 1;
              points[dayIndex] = score;
            }
          });

          setWeeklyPoints(points);
          const total = points.reduce((sum, point) => sum + point, 0);
          const avgPoints = total / 7;
          setTotalPoints(total);

          const currentStatus = getStatus(avgPoints);
          setStatus(currentStatus);
          setStatusColor(getColor(currentStatus));
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GlassCard className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-8">Weekly Wellness Tracker</h2>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Chart Section */}
        <div className="flex-grow w-full lg:w-2/3 h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
          {weeklyPoints.map((points, index) => {
            const heightPercentage = Math.min((points / 100) * 100, 100); // Assuming max points per day is 100
            return (
              <div key={index} className="flex flex-col items-center gap-3 flex-1 h-full justify-end group">
                <div className="relative w-full max-w-[40px] bg-gray-100 rounded-lg h-full overflow-hidden flex items-end hover:bg-gray-200 transition-colors">
                  <div
                    className="w-full rounded-lg bg-emerald-500 group-hover:bg-emerald-400 transition-all duration-500 ease-out"
                    style={{ height: `${heightPercentage}%`, minHeight: points > 0 ? '4px' : '0' }}
                  ></div>
                  {points > 0 && <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{points} pts</div>}
                </div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span>
              </div>
            )
          })}
        </div>

        {/* Score Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className={`relative w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center mb-6 transition-colors duration-500
                    ${statusColor === 'emerald' ? 'border-emerald-100 bg-emerald-50/30' :
              statusColor === 'amber' ? 'border-amber-100 bg-amber-50/30' :
                'border-rose-100 bg-rose-50/30'}`}
          >
            <span className="text-4xl font-bold text-gray-800">{totalPoints}</span>
            <span className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">Total Points</span>
          </div>

          <h3 className={`text-2xl font-bold mb-2 text-center
                     ${statusColor === 'emerald' ? 'text-emerald-600' :
              statusColor === 'amber' ? 'text-amber-600' :
                'text-rose-600'}`
          }>
            {status}
          </h3>

          {(status === "Needs Improvement" || status === "Consult Therapist") && (
            <button
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl transition-all shadow-lg shadow-emerald-200 transform hover:-translate-y-0.5"
              onClick={() => navigate("/therapistDb")}
            >
              Book Consultation
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default Analysis;
