// No changes needed if the plan is just to rely on the parent padding fix.
// But to be safe, I'll update the component to ensure it consumes full width properly.
import React, { useState } from "react";
import Cookies from "js-cookie";
import API from "../../api/api";
import { FaPlus } from "react-icons/fa";

const ADDE = ({ addContact }) => {
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });
  const [loading, setLoading] = useState(false);
  // ... existing code ...

  const getUserEmail = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) return JSON.parse(storedUser).email;
    return null;
  };

  const userEmail = getUserEmail();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Add a new contact
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      return;
    }
    setLoading(true);

    const contactData = {
      userId: userEmail,
      name: newContact.name,
      phoneNumber: newContact.phone,
      relationship: newContact.relationship,
    };

    try {
      const response = await API.post(
        `/emergency-contacts/add/${userEmail}`,
        contactData
      );

      if (response.status === 200) {
        addContact(contactData);
        setNewContact({ name: "", phone: "", relationship: "" });
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Failed to save contact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={newContact.phone}
            onChange={handleChange}
            placeholder="e.g. +1 234..."
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Relationship
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            name="relationship"
            value={newContact.relationship}
            onChange={handleChange}
            placeholder="e.g. Brother, Friend"
            className="flex-grow px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 text-sm disabled:opacity-50 shadow-lg shadow-emerald-200"
          >
            {loading ? 'Top...' : <><FaPlus size={12} /> Add</>}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ADDE;
