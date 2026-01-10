import React from "react";

const TherapistDisplayCard = ({
  profilePicture,
  name,
  specialization,
  licenceNo,
  email,
  onBookNow,
}) => {
  return (
    <div className="card card-hover overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={profilePicture || "https://via.placeholder.com/300x200/667eea/ffffff?text=Therapist"}
          alt={`${name} - Mental Health Professional`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
          {name}
        </h3>

        <div className="mb-4">
          <p className="text-sm font-medium text-primary-600 mb-1">
            {specialization}
          </p>
          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
            <span>Licensed Professional</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <span className="font-medium">License:</span>
            <span className="font-mono text-xs bg-neutral-100 px-2 py-1 rounded">
              {licenceNo}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <span className="font-medium">Email:</span>
            <span className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
              {email}
            </span>
          </div>
        </div>

        <button
          className="w-full btn-primary group-hover:shadow-glow transition-all duration-300"
          onClick={() => onBookNow({ name, email })}
        >
          Schedule Session
        </button>

        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-neutral-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success-400 rounded-full"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDisplayCard;
