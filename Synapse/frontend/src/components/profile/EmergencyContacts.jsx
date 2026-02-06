import React, { useState, useEffect } from "react";
import AddEmergencyContact from "./AddEmergencyContact";
import ShowEmergencyContacts from "./ShowEmergencyContacts";
import GlassCard from "../common/GlassCard";
import API from "../../api/api";
import Cookies from "js-cookie";

const EMGC = () => {
  const [contacts, setContacts] = useState([]);

  // Get email from localStorage (preferred) or Cookies (fallback)
  const getUserEmail = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) return JSON.parse(storedUser).email;
    return null;
  };

  const userEmail = getUserEmail();

  // Fetch contacts from backend
  const fetchContacts = async () => {
    if (!userEmail) return;

    try {
      const response = await API.get(`/emergency-contacts/user/${userEmail}`);
      if (response.status === 200) {
        setContacts(response.data.contacts || []); // Set an empty array if no contacts found
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]); // Ensure contacts is initialized even on error
    }
  };

  useEffect(() => {
    /* if (!userEmail) {
       // Preventing alert spam on load if user is redirecting
       // alert("No user logged in!");
       return;
     } */
    if (userEmail) fetchContacts();
  }, [userEmail]);

  // Function to add new contact
  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = async (phoneNumber, relationship) => {
    try {
      const response = await API.delete(
        `/emergency-contacts/delete/${userEmail}`,
        { params: { phoneNumber, relationship } }
      );

      if (response.status === 200) {
        setContacts((prevContacts) =>
          prevContacts.filter(
            (contact) =>
              contact.phoneNumber !== phoneNumber ||
              contact.relationship !== relationship
          )
        );
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  const updateContact = async (oldPhone, oldRel, updatedContact) => {
    try {
      // Optimistic update
      const newContacts = contacts.map(c =>
        (c.phoneNumber === oldPhone && c.relationship === oldRel) ? updatedContact : c
      );
      setContacts(newContacts);

      const response = await API.put(`/emergency-contacts/update/${userEmail}`, newContacts);

      if (response.status !== 200) {
        // Revert on failure (reload logic or manual revert)
        alert("Failed to update contact.");
        fetchContacts(); // Reload to sync with server
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact.");
      fetchContacts();
    }
  };

  return (
    <GlassCard className="h-full flex flex-col !p-0 overflow-hidden">
      <div className="p-6 sm:p-8 flex-grow overflow-y-auto custom-scrollbar">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Emergency Contacts</h3>
        <AddEmergencyContact addContact={addContact} />
        <div className="my-6 border-b border-gray-100"></div>
        <ShowEmergencyContacts contacts={contacts} deleteContact={deleteContact} updateContact={updateContact} />
      </div>
    </GlassCard>
  );
};

export default EMGC;
