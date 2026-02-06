import React from "react";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Users, Calendar, TrendingUp } from "lucide-react";

const data = [
    { name: "Mon", patients: 4 },
    { name: "Tue", patients: 6 },
    { name: "Wed", patients: 5 },
    { name: "Thu", patients: 8 },
    { name: "Fri", patients: 7 },
    { name: "Sat", patients: 4 },
    { name: "Sun", patients: 2 },
];

const StatCard = ({ title, value, icon: Icon, trend, color, accentColor }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-[160px] relative overflow-hidden group hover:shadow-md transition-all duration-300">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${accentColor}`}>
            <Icon size={80} />
        </div>

        <div className="flex justify-between items-start z-10">
            <div>
                <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">{title}</p>
                <h3 className="text-4xl font-bold text-gray-800 mt-2">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-20 text-emerald-700`}>
                <Icon size={24} />
            </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm z-10">
            <span className="text-emerald-600 font-medium flex items-center gap-1">
                <TrendingUp size={14} /> {trend}
            </span>
            <span className="text-gray-400">vs last week</span>
        </div>
    </div>
);

const StatsWidgets = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Active Patients"
                value="12"
                icon={Users}
                trend="+12%"
                color="bg-purple-100"
                accentColor="text-purple-600"
            />

            <StatCard
                title="Total Sessions"
                value="48"
                icon={Calendar}
                trend="+8%"
                color="bg-blue-100"
                accentColor="text-blue-600"
            />

            <StatCard
                title="Pending Requests"
                value="3"
                icon={Users}
                trend="2 new"
                color="bg-orange-100"
                accentColor="text-orange-600"
            />

            {/* Mini Chart Widget */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between h-[160px]">
                <div>
                    <p className="text-emerald-100 font-medium text-sm">Weekly Activity</p>
                    <h3 className="text-2xl font-bold mt-1">36 Sessions</h3>
                </div>
                <div className="h-[60px] w-full mt-2" style={{ minHeight: '60px' }}>
                    <ResponsiveContainer width="99%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="patients" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorPatients)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StatsWidgets;
