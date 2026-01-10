import React, { useState, useEffect } from "react";
import AddEmergencyContact from "./AddEmergencyContact";
import ShowEmergencyContacts from "./ShowEmergencyContacts";
import API from "../../api/api";
import Cookies from "js-cookie";

const EMGC = () => {
  const [contacts, setContacts] = useState([]);

  // Get email from localStorage (preferred) or Cookies (fallback)
  const getUserEmail = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) return JSON.parse(storedUser).email;
    return Cookies.get("email");
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
    if (!userEmail) {
      alert("No user logged in!");
      return;
    }
    fetchContacts(); // Initial fetch when component mounts
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
        alert("Contact deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  return (
    <>
      <AddEmergencyContact addContact={addContact} />
      <ShowEmergencyContacts contacts={contacts} deleteContact={deleteContact} />
    </>
  );
};

export default EMGC;
