"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (maxTime) params.append("maxTime", maxTime);

    router.push(`/recipes?${params.toString()}`);
  };

  const isNextEnabled = query.trim() !== "" || cuisine !== "" || maxTime !== "";

  return (
    <div className="container">
      <form className="mx-auto sm:w-[80%] space-y-7 bg-white p-5 md:p-20 shadow-lg rounded-lg">
      <div>
        <label className="label">Recipe Query</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a recipe"
          className="input"
        />
      </div>

      <div>
        <label className="label">Cuisine</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="input"
        >
          <option value="" className="text-[#8B8B8B]">Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Asian">Asian</option>
          <option value="French">French</option>
          <option value="Indian">Indian</option>
        </select>
      </div>

      <div>
        <label className="label">Max Preparation Time (minutes)</label>
        <input
          type="number"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          min="1"
          className="input"
        />
      </div>
      <button
        type="button"
        onClick={handleNext}
        className={`w-full p-2 rounded bg-[#00843c] text-white ${
          !isNextEnabled && "opacity-60 cursor-not-allowed"
        }`}
        disabled={!isNextEnabled}
      >
        Next
      </button>
    </form>
    </div>
  );
};

export default SearchForm;
