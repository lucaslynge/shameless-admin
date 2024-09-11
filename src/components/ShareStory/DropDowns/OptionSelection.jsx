import { useState, FC } from "react";

export const OptionSelection = ({
  option, 
  setOption
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState("Full annonymus");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOption(option)
    setIsOpen(false);
  };

  return (
    <div className="w-full relative inline-block text-left bg-white">
      <button
      
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center border border-[#C8C8C8] text-[#414141] focus:outline-none font-medium rounded-md text-sm px-5 py-3 text-center"
        type="button"
      >
        {option}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0.705078L5 5.70508L10 0.705078H0Z" fill="#414141" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="w-full z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-md"
        >
          <ul
            className="py-2 text-sm border border-[#C8C8C8] rounded-bl-md rounded-br-md bg-[#fffcfc]"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <p
                onClick={() => handleOptionClick("Option 1")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Option 1
              </p>
            </li>
            <li>
              <p
                onClick={() => handleOptionClick("Option 2")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Option 2
              </p>
            </li>
            <li>
              <p
                onClick={() => handleOptionClick("Option 3")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Option 3
              </p>
            </li>
            <li>
              <p
                onClick={() => handleOptionClick("Option 4")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Option 4
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
