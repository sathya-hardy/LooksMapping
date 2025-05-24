import React, { useState } from "react";

export default function PhotoRater({ value }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        padding: 20,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderLeft: "1px solid #ddd",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        RATE YOUR OWN PHOTO!
      </div>

      {/* Replace the URL with your own logo */}
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
        alt="Logo"
        style={{ width: 80, height: 80, marginBottom: 20 }}
      />

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          style={{
            backgroundColor: "#db1e5d",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Submit
        </button>
      ) : (
        <div style={{ fontWeight: "bold", fontSize: 16, color: "#333" }}>
          Your photo has been rated {value}
        </div>
      )}
    </div>
  );
}
