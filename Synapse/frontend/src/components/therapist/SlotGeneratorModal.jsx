import React, { useState } from "react";
import { X } from "lucide-react";

const daysOfWeek = [
    { id: "MONDAY", label: "Mon" },
    { id: "TUESDAY", label: "Tue" },
    { id: "WEDNESDAY", label: "Wed" },
    { id: "THURSDAY", label: "Thu" },
    { id: "FRIDAY", label: "Fri" },
    { id: "SATURDAY", label: "Sat" },
    { id: "SUNDAY", label: "Sun" },
];

const SlotGeneratorModal = ({ isOpen, onClose, onGenerate }) => {
    const [config, setConfig] = useState({
        startDate: "",
        endDate: "",
        startTime: "09:00",
        endTime: "17:00",
        duration: 60,
        breakTime: 10,
        selectedDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
    });

    if (!isOpen) return null;

    const handleDayToggle = (dayId) => {
        setConfig((prev) => {
            const isSelected = prev.selectedDays.includes(dayId);
            if (isSelected) {
                return {
                    ...prev,
                    selectedDays: prev.selectedDays.filter((d) => d !== dayId),
                };
            } else {
                return { ...prev, selectedDays: [...prev.selectedDays, dayId] };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(config);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px] shadow-xl relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Generate Availability Slots
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={config.startDate}
                                onChange={(e) =>
                                    setConfig({ ...config, startDate: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={config.endDate}
                                onChange={(e) =>
                                    setConfig({ ...config, endDate: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Time
                            </label>
                            <input
                                type="time"
                                required
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={config.startTime}
                                onChange={(e) =>
                                    setConfig({ ...config, startTime: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Time
                            </label>
                            <input
                                type="time"
                                required
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={config.endTime}
                                onChange={(e) =>
                                    setConfig({ ...config, endTime: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Duration (min)
                            </label>
                            <input
                                type="number"
                                min="15"
                                step="15"
                                required
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={config.duration}
                                onChange={(e) =>
                                    setConfig({ ...config, duration: parseInt(e.target.value) })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gap (min)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="5"
                                required
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={config.breakTime}
                                onChange={(e) =>
                                    setConfig({ ...config, breakTime: parseInt(e.target.value) })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Repeats On
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {daysOfWeek.map((day) => (
                                <button
                                    key={day.id}
                                    type="button"
                                    onClick={() => handleDayToggle(day.id)}
                                    className={`px-3 py-1 text-sm rounded-full transition-colors ${config.selectedDays.includes(day.id)
                                            ? "bg-emerald-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {day.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded shadow-sm"
                        >
                            Generate Slots
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SlotGeneratorModal;
