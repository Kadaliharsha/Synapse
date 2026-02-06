import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../api/api";
import SlotGeneratorModal from "./SlotGeneratorModal";
import { Trash2 } from "lucide-react";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const AvailabilityManager = ({ therapistId }) => {
    const [events, setEvents] = useState([]);
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        if (therapistId) {
            fetchSlots();
        }
    }, [therapistId]);

    const fetchSlots = async () => {
        try {
            const response = await API.get(`/slots/therapist/${therapistId}`);
            if (response.status === 200) {
                const mappedEvents = response.data.map((slot) => ({
                    id: slot.id,
                    title: slot.isBooked ? "Booked" : "Available",
                    start: new Date(`${slot.date}T${slot.startTime}`),
                    end: new Date(`${slot.date}T${slot.endTime}`),
                    resource: slot,
                }));
                setEvents(mappedEvents);
            }
        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    };

    const handleGenerate = async (config) => {
        const {
            startDate,
            endDate,
            startTime,
            endTime,
            duration,
            breakTime,
            selectedDays,
        } = config;
        const newSlots = [];

        let current = new Date(`${startDate}T00:00:00`);
        const end = new Date(`${endDate}T23:59:59`);
        const dayMap = {
            SUNDAY: 0,
            MONDAY: 1,
            TUESDAY: 2,
            WEDNESDAY: 3,
            THURSDAY: 4,
            FRIDAY: 5,
            SATURDAY: 6,
        };

        while (current <= end) {
            const dayName = Object.keys(dayMap).find(
                (key) => dayMap[key] === current.getDay()
            );

            if (selectedDays.includes(dayName)) {
                // Generate slots for this day
                let slotStart = new Date(
                    `${format(current, "yyyy-MM-dd")}T${startTime}`
                );
                const dayEnd = new Date(`${format(current, "yyyy-MM-dd")}T${endTime}`);

                while (slotStart < dayEnd) {
                    const slotEnd = new Date(slotStart.getTime() + duration * 60000);

                    if (slotEnd > dayEnd) break;

                    newSlots.push({
                        therapistId,
                        date: format(current, "yyyy-MM-dd"),
                        startTime: format(slotStart, "HH:mm"),
                        endTime: format(slotEnd, "HH:mm"),
                        isBooked: false,
                    });

                    // Add break
                    slotStart = new Date(slotEnd.getTime() + breakTime * 60000);
                }
            }
            current.setDate(current.getDate() + 1);
        }

        if (newSlots.length === 0) {
            alert("No slots generated! Check your date range and selected days.");
            return;
        }

        try {
            // Chunk requests if too large (optional, but good practice)
            const response = await API.post("/slots", newSlots);
            if (response.status === 200) {
                alert(`Successfully created ${newSlots.length} slots!`);
                fetchSlots();
            }
        } catch (error) {
            console.error("Error creating slots:", error);
            alert("Failed to create slots. See console for details.");
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedSlot(event);
    };

    const handleDeleteSlot = async () => {
        if (!selectedSlot) return;
        if (selectedSlot.resource.isBooked) {
            alert("Cannot delete a booked slot!");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this slot?")) return;

        try {
            await API.delete(`/slots/${selectedSlot.id}`);
            setEvents((prev) => prev.filter((e) => e.id !== selectedSlot.id));
            setSelectedSlot(null);
        } catch (error) {
            console.error("Error deleting slot:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-[800px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Availability Calendar
                    </h2>
                    <p className="text-gray-500">
                        Manage your weekly schedule and upcoming appointments.
                    </p>
                </div>
                <button
                    onClick={() => setIsGeneratorOpen(true)}
                    className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-emerald-700 transition shadow-sm"
                >
                    + Generate Slots
                </button>
            </div>

            <div className="flex-1">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: event.resource.isBooked ? "#EF4444" : "#10B981", // Red if booked, Green if free
                            color: "white",
                            borderRadius: "4px",
                            border: "none",
                        },
                    })}
                />
            </div>

            {/* Selected Slot Details Modal / Popover */}
            {selectedSlot && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[60]">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-80">
                        <h3 className="text-lg font-bold mb-2">Slot Details</h3>
                        <p className="text-gray-600 mb-1">
                            <strong>Date:</strong>{" "}
                            {format(selectedSlot.start, "MMMM d, yyyy")}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Time:</strong> {format(selectedSlot.start, "h:mm a")} -{" "}
                            {format(selectedSlot.end, "h:mm a")}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <strong>Status:</strong>{" "}
                            {selectedSlot.resource.isBooked ? (
                                <span className="text-red-500 font-semibold">Booked</span>
                            ) : (
                                <span className="text-green-500 font-semibold">Available</span>
                            )}
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setSelectedSlot(null)}
                                className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Close
                            </button>
                            {!selectedSlot.resource.isBooked && (
                                <button
                                    onClick={handleDeleteSlot}
                                    className="px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded flex items-center gap-2"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <SlotGeneratorModal
                isOpen={isGeneratorOpen}
                onClose={() => setIsGeneratorOpen(false)}
                onGenerate={handleGenerate}
            />
        </div>
    );
};

export default AvailabilityManager;
