import React, { useRef, useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";

export default function SearchBox({
  searchArray,
  query,
  setQuery,
  onSearch,
  placeholder = "Search for here...",
}) {
  const [suggestions, setSuggestions] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const inputRef = useRef(null);

  const refineQuery = query?.trim();
  const limitedSuggestions =
    suggestions?.length > 10 ? suggestions.slice(0, 10) : suggestions;

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setQuery(inputText);
    setSelectedSuggestion(null);

    const filteredSuggestions = searchArray?.filter((item) =>
      item?.toLowerCase().includes(inputText.trim().toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setSelectedItemIndex(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const clearQuery = () => {
    setQuery("");
  };

  const handleKeyPress = (e) => {
    if (!isFocused) {
      handleFocus();
    }
    if (e.key === "Escape") {
      inputRef.current.blur();
      handleBlur();
    } else if (e.key === "Enter") {
      if (!query) {
        return;
      }
      selectedSuggestion
        ? handleSearchUsingSuggestion(selectedSuggestion)
        : onSearch();
      handleBlur();
    } else if (e.key === "ArrowUp" && query) {
      e.preventDefault();
      if (selectedItemIndex > 0) {
        setSelectedItemIndex(selectedItemIndex - 1);
        setSelectedSuggestion(suggestions[selectedItemIndex - 1]);
      }
    } else if (e.key === "ArrowDown" && query) {
      e.preventDefault();
      if (selectedItemIndex < suggestions.length - 1) {
        setSelectedItemIndex(selectedItemIndex + 1);
        setSelectedSuggestion(suggestions[selectedItemIndex + 1]);
      }
    }
  };

  const handleSearchUsingSuggestion = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const highlightMatchedCharacters = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<span class="font-semibold">$1</span>');
  };

  return (
    <div
      className={`w-full relative flex items-center border rounded-full bg-white text-zinc-700 z-30`}
    >
      <button
        className=" text-zinc-500 px-4 py-3 rounded-r-lg"
        onClick={() => {
          selectedSuggestion
            ? handleSearchUsingSuggestion(selectedSuggestion)
            : query && onSearch();
          handleBlur();
        }}
      >
        <HiSearch className="w-6 h-6 " />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        value={selectedSuggestion || query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onFocus={() => handleFocus()}
        ref={inputRef}
        className="w-full rounded-full !focus-visible:outline-none border-none   py-3 "
      />
      {query && (
        <button
          onClick={clearQuery}
          className="mx-4 p-1 rounded-full hover:bg-zinc-100"
        >
          <HiX className="w-4 h-4" />
        </button>
      )}
      {isFocused && refineQuery && limitedSuggestions?.length > 0 && (
        <div className=" bg-white absolute w-full top-16 text-left shadow rounded-lg  p-4 overflow-auto ">
          <ul>
            {limitedSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSearchUsingSuggestion(suggestion), handleBlur();
                }}
                className={`p-2 rounded-md cursor-pointer hover:bg-primary-50 ${
                  selectedItemIndex === index ? "bg-primary-50" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: highlightMatchedCharacters(suggestion, refineQuery),
                }}
              ></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
