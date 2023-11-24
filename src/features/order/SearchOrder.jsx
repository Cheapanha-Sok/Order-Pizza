import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    if(!query) return
    navigate(`/order/${query}`)
    setQuery("")
    console.log(query)

  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full p-2 text-stone-600
         bg-yellow-100 transition-all 
         duration-300 focus:outline-none placeholder:text-stone-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 md:focus:w-72"
      />
    </form>
  );
}
