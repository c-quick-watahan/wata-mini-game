import React from "react";

export default function MyStopWatch({
  minutes,
  seconds,
}: {
  minutes: number;
  seconds: number;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "25px",
          color: "blue",
          backgroundColor: "#f0f0f0",
          padding: "10px 20px",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
