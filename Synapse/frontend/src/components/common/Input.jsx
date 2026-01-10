import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";

const Input = ({ label, value, onChange, onSave }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    setIsEdit(false);
    onSave(); // Call the save function to update the database
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
      <label className="text-neutral-600 font-medium w-full sm:w-24 text-left">
        {label}:
      </label>
      {isEdit ? (
        <div className="flex-grow relative bg-neutral-50 border border-primary-200 h-[50px] rounded-lg flex items-center shadow-inner transition-all duration-300">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="bg-transparent text-neutral-800 text-lg p-3 pl-4 outline-none w-full h-full rounded-lg"
          />
          <button
            onClick={handleSave}
            className="absolute right-3 p-2 text-success-600 hover:text-success-700 hover:bg-success-50 rounded-full transition-colors"
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <div className={`flex-grow relative p-3 pl-4 h-[50px] rounded-lg flex items-center border transition-all duration-300 ${onSave ? "bg-neutral-50 border-neutral-200" : "bg-neutral-100 border-transparent text-neutral-500 cursor-not-allowed"
          }`}>
          <span className="text-neutral-800 text-lg">{value}</span>
          {onSave && (
            <button
              onClick={() => setIsEdit(true)}
              className="absolute right-3 p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-colors"
            >
              <BiSolidPencil className="text-lg" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
