import React, { useState, useEffect } from "react";
import API from "../../../api/api"; // Adjust
import { Save, AlertCircle, CheckCircle } from "lucide-react";

const SOAPNoteEditor = ({ appointmentId, patientEmail, therapistEmail, existingNote, onSave }) => {
    const [formData, setFormData] = useState({
        id: null,
        subjective: "",
        objective: "",
        assessment: "",
        plan: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (existingNote) {
            setFormData({
                subjective: existingNote.subjective || "",
                objective: existingNote.objective || "",
                assessment: existingNote.assessment || "",
                plan: existingNote.plan || ""
            });
        } else if (appointmentId) {
            // Fetch note if not provided
            const fetchNote = async () => {
                try {
                    const response = await API.get(`/notes/appointment/${appointmentId}`);
                    if (response.status === 200 && response.data.length > 0) {
                        const note = response.data[0]; // Assuming one note per appointment
                        setFormData({
                            id: note.id,
                            subjective: note.subjective || "",
                            objective: note.objective || "",
                            assessment: note.assessment || "",
                            plan: note.plan || ""
                        });
                        // Also store the ID so we update instead of create new
                        // But wait, existingNote prop handled ID. We need to handle it here too.
                        // We need a way to store the ID in state or formData.
                        // Adding id to formData state on line 6 might be cleaner, 
                        // but let's just add it to a separate state or hack it into formData.
                    } else {
                        // No note found, reset form
                        setFormData({
                            id: null,
                            subjective: "",
                            objective: "",
                            assessment: "",
                            plan: "",
                        });
                    }
                } catch (err) {
                    console.log("No existing note found or error fetching.");
                    // Reset form on error/404
                    setFormData({
                        id: null,
                        subjective: "",
                        objective: "",
                        assessment: "",
                        plan: "",
                    });
                }
            };
            fetchNote();
        } else {
            // Reset if neither existingNote nor appointmentId (shouldn't happen often but good safety)
            setFormData({
                id: null,
                subjective: "",
                objective: "",
                assessment: "",
                plan: "",
            });
        }
    }, [existingNote, appointmentId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const payload = {
                ...formData,
                appointmentId,
                patientEmail,
                therapistEmail,
                // If updating, ideally send ID.
                id: formData.id || (existingNote ? existingNote.id : null)
            };

            const response = await API.post("/notes", payload);
            if (response.status === 200) {
                setMessage({ type: "success", text: "Note saved successfully!" });
                if (onSave) onSave(response.data);
            }
        } catch (error) {
            console.error("Error saving note", error);
            setMessage({ type: "error", text: "Failed to save note." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mt-4 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                Clinical Notes (SOAP)
            </h4>

            {message && (
                <div className={`p-3 mb-4 rounded-lg flex items-center gap-2 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    {message.text}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Subjective</label>
                    <textarea
                        name="subjective"
                        value={formData.subjective}
                        onChange={handleChange}
                        placeholder="Patient's stated symptoms, feelings, and concerns..."
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm h-24 resize-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Objective</label>
                    <textarea
                        name="objective"
                        value={formData.objective}
                        onChange={handleChange}
                        placeholder="Observable signs, test results, and physical exam findings..."
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm h-24 resize-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Assessment</label>
                    <textarea
                        name="assessment"
                        value={formData.assessment}
                        onChange={handleChange}
                        placeholder="Diagnosis and analysis of the patient's condition..."
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm h-24 resize-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Plan</label>
                    <textarea
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        placeholder="Treatment plan, medications, and follow-up instructions..."
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm h-24 resize-none"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={18} />
                    {loading ? "Saving..." : "Save Note"}
                </button>
            </div>
        </div>
    );
};

export default SOAPNoteEditor;
