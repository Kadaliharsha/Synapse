import React, { useState } from "react";
import { FaPhone, FaTimes, FaPencilAlt, FaCheck, FaBan } from "react-icons/fa";

const Contact = ({ phone, name, relationship, deleteContact, updateContact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedRel, setEditedRel] = useState(relationship);

  const handleSave = () => {
    if (!editedName || !editedPhone || !editedRel) {
      alert("All fields are required");
      return;
    }

    updateContact(phone, relationship, {
      name: editedName,
      phoneNumber: editedPhone,
      relationship: editedRel
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setEditedPhone(phone);
    setEditedRel(relationship);
    setIsEditing(false);
  };

  return (
    <div className={`group rounded-xl border transition-all duration-300 p-3 sm:p-4 ${isEditing ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100/50'}`}>

      {/* Desktop/Tablet Layout - Grid */}
      <div className="hidden sm:grid grid-cols-12 items-center gap-4">
        <div className="col-span-1 flex justify-center">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isEditing ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
            <FaPhone size={12} />
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-1">
          {isEditing ? (
            <>
              <input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-sm font-semibold text-gray-800 border-b border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent w-full"
                placeholder="Name"
              />
              <input
                value={editedRel}
                onChange={(e) => setEditedRel(e.target.value)}
                className="text-xs text-gray-500 border-b border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent w-full uppercase"
                placeholder="Relationship"
              />
            </>
          ) : (
            <>
              <span className="font-semibold text-gray-800 text-sm truncate" title={name}>{name}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide truncate" title={relationship}>{relationship}</span>
            </>
          )}
        </div>

        <div className="col-span-4">
          {isEditing ? (
            <input
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
              className="font-mono text-sm text-gray-800 border-b border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent w-full"
              placeholder="Phone Number"
            />
          ) : (
            <div className="text-gray-600 font-mono text-sm truncate" title={phone}>{phone}</div>
          )}
        </div>

        <div className="col-span-2 flex justify-end gap-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-colors" title="Save">
                <FaCheck size={14} />
              </button>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors" title="Cancel">
                <FaBan size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-emerald-600 hover:bg-white p-2 rounded-full transition-all"
                title="Edit Contact"
              >
                <FaPencilAlt size={12} />
              </button>
              <button
                onClick={() => deleteContact(phone, relationship)}
                className="text-gray-400 hover:text-red-500 hover:bg-white p-2 rounded-full transition-all"
                title="Remove Contact"
              >
                <FaTimes size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex sm:hidden flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <FaPhone size={14} />
          </div>
          <div className="flex flex-col w-full gap-1">
            {isEditing ? (
              <>
                <input value={editedName} onChange={(e) => setEditedName(e.target.value)} className="border-b text-sm font-semibold w-full" placeholder="Name" />
                <input value={editedRel} onChange={(e) => setEditedRel(e.target.value)} className="border-b text-xs w-full" placeholder="Rel" />
              </>
            ) : (
              <>
                <span className="font-semibold text-gray-800 text-sm">{name}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">{relationship}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center pl-13">
          {isEditing ? (
            <input value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} className="border-b text-sm font-mono w-2/3" placeholder="Phone" />
          ) : (
            <span className="text-gray-600 font-mono text-sm">{phone}</span>
          )}

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="text-emerald-600 p-2"><FaCheck size={14} /></button>
                <button onClick={handleCancel} className="text-gray-400 p-2"><FaBan size={14} /></button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-emerald-600 p-2"><FaPencilAlt size={12} /></button>
                <button onClick={() => deleteContact(phone, relationship)} className="text-gray-400 hover:text-red-500 p-2"><FaTimes size={14} /></button>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
