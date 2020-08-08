import React from "react";
import "./Currency.css";

const Currency = ({ rates, amount, setAmount, selectedOption, dispatch }) => {
  return (
    <div>
      <input type="number" value={amount} onChange={dispatch} />
      <select value={selectedOption} onChange={setAmount}>
        {rates.map((rate) => (
          <option key={rate.curName} value={rate.curName}>
            {rate.curName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Currency;
