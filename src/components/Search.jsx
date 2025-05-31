import { useState } from "react";

export default function Search({ originalPoints, setSearchResult }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setMatches([]);
      setSearchResult(null);
      return;
    }

    const results = originalPoints
      .filter((p) => p.name.toLowerCase().includes(term.toLowerCase()))
      .slice(0, 5);

    setMatches(results);
  };

  const handleSelect = (point) => {
    setSearchResult(point);
    setSearchTerm(point.name);
    setMatches([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <input
        type="text"
        placeholder="Search for a restaurant..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {matches.length > 0 && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {matches.map((m, i) => (
            <li
              key={i}
              onClick={() => handleSelect(m)}
              style={{
                cursor: "pointer",
                background: "#fff",
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
              }}
            >
              {m.name} - ⭐ {m.rating}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
