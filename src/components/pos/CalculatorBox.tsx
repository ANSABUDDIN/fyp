import React, { useState, useEffect } from "react";

const CalculatorBox: React.FC = () => {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const beepSound = new Audio("/sound.mp3"); // Provide the path to your beep sound file
      beepSound.play();
      const { key } = event;
      if (/[0-9/*\-+.]/.test(key)) {
        setResult(result + key);
      } else if (key === "Enter") {
        calculate();
      } else if (key === "Backspace") {
        setResult(result.slice(0, -1));
      } else if (key === "Escape") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [result]);

  const handleClick = (value: string) => {
    const beepSound = new Audio("/sound.mp3"); // Provide the path to your beep sound file
    beepSound.play();
    setResult(result + value);
  };

  const clear = () => {
    const beepSound = new Audio("/sound.mp3"); // Provide the path to your beep sound file
    beepSound.play();
    setResult("");
  };

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="flex flex-col justify-center w-full items-center mt-10">
      <div className="border border-gray-300 rounded-lg p-4 w-full">
        <input
          type="text"
          className="w-full text-right mb-2 border-b border-gray-300 focus:outline-none"
          value={result}
          readOnly
        />
        <div className="grid grid-cols-4 gap-2">
          <button
            className="col-span-2 bg-gray-200 rounded-lg py-2 text-gray-700 font-semibold"
            onClick={clear}
          >
            Clear
          </button>
          <button
            className="bg-gray-200 rounded-lg py-2 text-gray-700 font-semibold"
            onClick={calculate}
          >
            =
          </button>
          {[7, 8, 9, "/"].map((value) => (
            <button
              key={value}
              className="bg-gray-200 rounded-lg py-2 text-gray-700 font-semibold"
              onClick={() => handleClick(value.toString())}
            >
              {value}
            </button>
          ))}
          {[4, 5, 6, "*"].map((value) => (
            <button
              key={value}
              className="bg-gray-200 rounded-lg py-2 text-gray-700 font-semibold"
              onClick={() => handleClick(value.toString())}
            >
              {value}
            </button>
          ))}
          {[1, 2, 3, "-"].map((value) => (
            <button
              key={value}
              className="bg-gray-200 rounded-lg py-2 text-gray-700 font-semibold"
              onClick={() => handleClick(value.toString())}
            >
              {value}
            </button>
          ))}
          {[".", 0, "+"].map((value) => (
            <button
              key={value}
              className="bg-gray-200 rounded-lg py-2 text-gray-700 font-semibold"
              onClick={() => handleClick(value.toString())}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorBox;
