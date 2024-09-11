import { useFormikContext } from "formik";
import { useState, FC } from "react";

export const AgeSelection= ({ ageOption, setAgeOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setFieldValue } = useFormikContext();
  const [selectedOption, setSelectedOption] =
    useState("Full anonymous");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setAgeOption(option);
    setFieldValue("age", option);
  };

  const ageOptions = Array.from({ length: 48 }, (_, i) => (i + 18).toString());

  return (
    <div className="w-full relative inline-block text-left bg-white">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center border border-[#C8C8C8] text-[#414141] focus:outline-none font-medium rounded-md text-sm px-5 py-3 text-center"
        type="button"
      >
        {ageOption}
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
            className="py-2 text-sm border border-[#C8C8C8] rounded-bl-md rounded-br-md bg-[#fffcfc] h-[250px] overflow-y-auto scrollbar-hide"
            aria-labelledby="dropdownDefaultButton"
          >
            {ageOptions.map((age) => (
              <li key={age}>
                <p
                  onClick={() => handleOptionClick(age)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {age}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
