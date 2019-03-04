import React from "react";

function SelectInput({
  name,
  label,
  options,
  onChange,
  value,
  error
}) {
  return (
    <div className="form-group">
      <label htmlFor={`${name}-input`}>{label}</label>
      <select
        value={value}
        className="custom-select"
        id={`${name}-input`}
        name={name}
        onChange={onChange}>
        <option key="default" value="">Choose one</option>
        {options.map(option => (
          <option value={option._id} key={`${option._id}`}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">
        {error}
      </div>}
    </div>
  );
}

export default SelectInput;
