import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Contact from "./Contact";

const ShowE = ({ contacts, deleteContact }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const showNext = () => {
    if (currentIndex + itemsPerPage < contacts.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (contacts.length === 0) {
    return <div className="text-gray-400 text-sm text-center py-4 italic">No emergency contacts added yet.</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {contacts.slice(currentIndex, currentIndex + itemsPerPage).map((contact) => (
          <Contact
            key={contact.phoneNumber || Math.random()}
            phone={contact.phoneNumber || "N/A"}
            name={contact.name || "Unknown"}
            relationship={contact.relationship || "Not Specified"}
            deleteContact={deleteContact}
          />
        ))}
      </div>

      {contacts.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, contacts.length)} of {contacts.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={showPrevious}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-full hover:bg-emerald-50 text-emerald-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <FaChevronLeft size={16} />
            </button>

            <button
              onClick={showNext}
              disabled={currentIndex + itemsPerPage >= contacts.length}
              className="p-1.5 rounded-full hover:bg-emerald-50 text-emerald-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowE;
