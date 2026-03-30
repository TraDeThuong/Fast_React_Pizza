import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export default function SearchOrder() {
    const [query, setQuery] = useState ("");
    const navigate = useNavigate()

    function handleSubmit (e) {
        e.preventDefault()
        if (!query) return;
        navigate (`order/${query}`);
        setQuery("")
    }
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-full bg-amber-100 
               focus:outline-none focus:ring-2 focus:ring-amber-400 
               placeholder:text-amber-500 text-sm transition-full "
      />
</form>
  )
}
