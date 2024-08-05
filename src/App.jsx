import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoIcon from "./InfoIcon";

const palette_size = 5;

const ColorPlate = ({ color, index, onIconLock, LockStatus }) => {
  const handleCopy = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast("Copied to clipboard!");
  };

  const handleLockUnlock = () => {
    onIconLock(index);
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className="flex gap-2 flex-col items-center justify-center font-medium text-xl"
    >
      <p onClick={handleCopy} className="p-2 hover:cursor-pointer">
        {color}
      </p>

      <div onClick={handleLockUnlock} className="cursor-pointer ">
        {LockStatus ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="lock-icon size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="unlock-icon size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

const generateRandomColors = () => {
  let colorCode = "#";
  for (let i = 0; i < 3; i++) {
    let colorInt = Math.random() * 256;
    colorCode = colorCode + parseInt(colorInt).toString(16).padStart(2, "0");
  }
  return colorCode;
};

function App() {
  const [LockStatusArray, setLockStatusArray] = useState(
    JSON.parse(localStorage.getItem("LockStatus")) ||
      Array.from({ length: palette_size }, () => {
        return false;
      })
  );

  const [colors, setColors] = useState(
    JSON.parse(localStorage.getItem("colors")) ||
      Array.from({ length: palette_size }, generateRandomColors)
  );

  const generateNewColorPalette = () => {
    let newColors = [];
    for (let i = 0; i < palette_size; i++) {
      if (LockStatusArray[i]) {
        newColors[i] = colors[i];
      } else {
        newColors[i] = generateRandomColors();
      }
    }
    setColors(newColors);
    localStorage.setItem("colors", JSON.stringify(newColors));
  };

  const toggleLock = (index) => {
    const newLockStatusArray = [...LockStatusArray];
    newLockStatusArray[index] = !LockStatusArray[index];
    setLockStatusArray(newLockStatusArray);
    localStorage.setItem("LockStatus", JSON.stringify(newLockStatusArray));
  };

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "space") {
      generateNewColorPalette();
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        theme="light"
      />
      <div className="flex flex-col h-screen">
        <div className="h-24 flex items-center justify-between md:px-10 px-6">
          <h1 className="text-3xl font-bold text-amber-500">Colors</h1>

          <div>
            <InfoIcon />
          </div>
        </div>

        <div className="grow grid grid-cols-1 md:grid-cols-5">
          {colors.map((colorValue, indexValue) => {
            return (
              <ColorPlate
                key={indexValue}
                color={colorValue}
                onIconLock={toggleLock}
                index={indexValue}
                LockStatus={LockStatusArray[indexValue]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
