import { useState, useEffect } from "react";

const InfoIcon = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <button
        className="text-gray-500 p-1 hover:text-gray-900 transition duration-300"
        onClick={handleInfoClick}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      {showInfo && (
        <div
          className="absolute bg-white rounded-lg p-4 w-64 z-10 shadow-[0px_0px_12px_6px_rgba(0,0,0,0.2)]"
          style={{ top: "9%", right: "3%" }}
        >
          <div className="my-2">
            <h2 className="text-lg font-bold mb-2">For Desktop Users</h2>
            <p className="text-gray-600">
              You can use space key to generate new colors.
            </p>
          </div>

          <div className="my-6">
            <h2 className="text-lg font-bold mb-2">For Small screen users</h2>
            <p className="text-gray-600">You can simply pull-to-refresh.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoIcon;
