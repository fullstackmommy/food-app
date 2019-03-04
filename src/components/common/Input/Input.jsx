import React from "react";

function Input({
  name,
  label,
  type = "text",
  onChange,
  value,
  error
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
      {error && <div className="alert alert-danger">
        {error}
      </div>}
    </div>
  )
}

export default Input;
