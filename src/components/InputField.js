import React from "react";

import "./InputField.css";

const InputField = ({
  type,
  placeholder,
  required,
  icon,
  value,
  onChangeHandler,
  iconClickHandler,
  disableLabel,
  id,
  leftIcon,
  style,
  defaultValue,
}) => {
  return (
    <div className="base-input mt-10" style={style}>
      {!disableLabel ? (
        <label className="base-input__label">
          {required ? <span>*</span> : null}
          {placeholder}
        </label>
      ) : null}

      <input
        defaultValue={defaultValue}
        style={leftIcon ? { paddingLeft: "2rem" } : null}
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
      />
      {icon ? (
        <span className="base-input__icon" onClick={iconClickHandler}>
          {icon}
        </span>
      ) : null}
      {leftIcon ? (
        <span className="base-input__icon__left" onClick={iconClickHandler}>
          {leftIcon}
        </span>
      ) : null}
    </div>
  );
};

export const InputButton = ({
  label,
  children,
  onClickHandler,
  type,
  style,
  btnStyle,
}) => {
  return (
    <div className="base-button mt-10" style={style}>
      <button
        style={btnStyle}
        className="base-input__button"
        type={type}
        onClick={onClickHandler}
      >
        {label || children}
      </button>
    </div>
  );
};

export default InputField;
