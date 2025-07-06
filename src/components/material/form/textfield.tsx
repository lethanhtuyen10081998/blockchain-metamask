import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

export interface TextFieldProps extends React.ComponentProps<"input"> {
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
}

const TextField = ({
  name,
  error,
  helperText,
  label,
  placeholder,
  ...props
}: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        {label && <Label>{label}</Label>}

        <Input placeholder={placeholder} {...props} />
      </div>

      <div>{error && <p className="text-red-500 text-sm">{helperText}</p>}</div>
    </div>
  );
};

export default function TextFieldForm({
  name,
  label,
  placeholder,
  ...props
}: TextFieldProps & {
  name: string;
}) {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          label={label}
          placeholder={placeholder}
          {...props}
        />
      )}
      name={name}
    />
  );
}
