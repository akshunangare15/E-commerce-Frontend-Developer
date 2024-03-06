import React from "react"; // Importing React

const Search = ({ setCity, searchRestaurants, city }) => {
  return (
    <div>
      {/* Input field for searching by city */}
      <input
        placeholder="search by city.."
        className="border border-black rounded p-2 py-1 me-2" // CSS classes for styling
        onChange={(e) => setCity(e.target.value)} // OnChange event handler to update city state
        value={city} // Value of the input field
      />

      {/* Search button */}
      <button
        onClick={() => searchRestaurants()} // OnClick event handler to trigger search
        className="p-2 px-4 bg-green-700 rounded w-[fit-content] text-white text-sm font-bold" // CSS classes for styling
      >
        Search
      </button>
    </div>
  );
};

export default Search; // Exporting Search component
