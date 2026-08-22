import React from "react";

export default function StatBox({ value, sub, delay = 0 }) {
  return (
    <div
      className="td-stat-box td-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="td-stat-box__value">{value}</div>
      <div className="td-stat-box__label">{sub}</div>
    </div>
  );
}
