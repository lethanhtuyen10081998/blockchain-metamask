"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import TextField, { TextFieldProps } from "./textfield";

interface PasswordFieldProps extends TextFieldProps {
  name: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  placeholder = "Enter your password",
  ...props
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <div className="relative w-full items-center">
          <TextField
            type={visible ? "text" : "password"}
            {...field}
            placeholder={placeholder}
            {...props}
          />

          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute inset-y-2 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 mt-5"
          >
            {visible ? (
              <EyeIcon className="h-4 w-4" />
            ) : (
              <EyeOffIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    />
  );
};

export default PasswordField;
