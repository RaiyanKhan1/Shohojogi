import React from "react";

export default function StatBox({ icon: Icon, value, sub }) {
  return (
    <div className="td-stat-box">
      {Icon && (
        <span className="td-stat-box__icon">
          <Icon size={18} />
        </span>
      )}
      <div>
        <div className="td-stat-box__label">{sub}</div>
        <div className="td-stat-box__value">{value}</div>
      </div>
    </div>
  );
}
