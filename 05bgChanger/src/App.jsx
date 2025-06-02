import { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState("green"); // green is default

  return (   //set color ka mtlb new value konsi deni ha
    <>
      {/* Container for background, ensure proper z-index and transition */}
      <div className="w-full h-screen transition-colors duration-200  " style={{ backgroundColor: color }}>
        
        {/* Fixed button container */}
        <div className="flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center bg-white px-3 py-2 gap-3 rounded-xl shadow-lg">
            <button
              className="outline-none text-white"
              style={{ backgroundColor: "red" }}
              onClick={() => setColor("red")}
            >
              Red
            </button>
            <button
              className="outline-none text-white"
              style={{ backgroundColor: "blue" }}
              onClick={() => setColor("blue")}
            >
              Blue
            </button>
            <button
              className="outline-none text-white"
              style={{ backgroundColor: "yellow" }}
              onClick={() => setColor("yellow")}
            >
              Yellow
            </button>
            <button
              className="outline-none text-white"
              style={{ backgroundColor: "gray" }}
              onClick={() => setColor("gray")}
            >
              Gray
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
