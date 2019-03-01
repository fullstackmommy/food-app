import React from "react";

function Input({
  name,
  label,
  type = "text",
  onChange,
  value
}) {
  return (
    <div className="form-group">
      <label htmlFor={`${name}-input`}>{label}</label>
      {type === "text"
        ? (<input
          type="text"
          className="form-control"
          id={`${name}-input`}
          name={name}
          onChange={onChange}
          value={value}/>)
        : (<input
          type="number"
          step="0.1"
          className="form-control"
          id={`${name}-input`}
          name={name}
          onChange={onChange}
          value={value}/>)}
    </div>
  );
}

export default Input;
