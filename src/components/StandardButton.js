import React from 'react';

const StandardButton = ({ onClick, label }) => {
  return (
   <button
   onClick={onClick}
   className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white"
   >
       {label}
   </button>
  );
};

export default StandardButton;