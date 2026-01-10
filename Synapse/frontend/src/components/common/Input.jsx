import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";

const Input = ({ label, value, onChange, onSave, className = "", disabled = false }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    setIsEdit(false);
    onSave(); // Call the save function to update the database
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full ${className}`}>
      <label className="text-gray-600 font-medium w-full sm:w-24 text-left text-sm uppercase tracking-wide">
        {label}
      </label>
      {isEdit && !disabled ? (
        <div className="flex-grow relative bg-white/60 backdrop-blur-sm border border-emerald-500 h-[50px] rounded-xl flex items-center shadow-sm transition-all duration-300 ring-2 ring-emerald-100">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="bg-transparent text-gray-800 text-base p-3 pl-4 outline-none w-full h-full rounded-xl"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="absolute right-3 p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <div className={`flex-grow relative p-3 pl-4 h-[50px] rounded-xl flex items-center border transition-all duration-300 ${onSave && !disabled ? "bg-white/40 border-white/40 hover:border-emerald-200" : "bg-gray-50/50 border-transparent text-gray-400 cursor-not-allowed"
          }`}>
          <span className="text-gray-800 text-base font-medium">{value}</span>
          {onSave && !disabled && (
            <button
              onClick={() => setIsEdit(true)}
              className="absolute right-3 p-2 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/80 rounded-full transition-colors opacity-60 hover:opacity-100"
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
