import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode; // icon truyền vào
  rightIcon?: React.ReactNode; // icon bên phải (VD: Eye/EyeOff)
  onRightIconClick?: () => void;
  value?: string; // thêm value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  required = false,
  icon,
  rightIcon,
  onRightIconClick,
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500`}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
