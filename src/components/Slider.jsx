import React from "react";

export default function Slider({ value, setValue, sliderActive, setSliderActive }) {
  return (
    <div
      style={{
        width: "100%",
        padding: 20,
        boxSizing: "border-box",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
      }}
    >
      {!sliderActive ? (
        <button
          onClick={() => setSliderActive(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#db1e5d",
            color: "white",
            border: "none",
            borderRadius: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Use Slider
        </button>
      ) : (
        <>
          <label
            style={{
              display: "block",
              marginBottom: 12,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Value:{" "}
            <span
              style={{
                backgroundColor: "#db1e5d",
                color: "white",
                padding: "4px 12px",
                borderRadius: 20,
                fontWeight: "bold",
                minWidth: 32,
                display: "inline-block",
                textAlign: "center",
              }}
            >
              {value}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
              cursor: "pointer",
              height: 8,
              borderRadius: 4,
              background: "linear-gradient(90deg, #f9c5d1, #db1e5d)",
              outline: "none",
              accentColor: "#db1e5d",
            }}
          />
          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => setSliderActive(false)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#aaa",
                color: "#fff",
                border: "none",
                borderRadius: 20,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Stop Slider
            </button>
          </div>
        </>
      )}
    </div>
  );
}

