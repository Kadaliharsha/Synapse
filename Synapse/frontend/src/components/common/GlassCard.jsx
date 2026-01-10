import React from 'react';

const GlassCard = ({ children, className = '' }) => {
    return (
        <div className={`bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/40 ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;
