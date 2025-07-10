"use client";

import {
    ComponentProps,
    HTMLAttributes,
    memo,
    useEffect,
    useState,
} from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export type AppInputProps = {
  icon?: React.ReactNode;
  placeholder: string;
  value?: string;
  name: string;
  type?: string;
  textarea?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  ps?: string;
  title?: string;
  rows?: number;
  error?: string[];
  onChange?: (value: string) => void;
  onErrorChange?: (hasError: boolean) => void;
  inputProps?: HTMLAttributes<HTMLInputElement> & ComponentProps<"input">;
};

export default memo(function AppInput({
  icon,
  placeholder,
  value,
  name,
  type = "text",
  onChange,
  textarea = false,
  // onErrorChange,
  ps,
  title,
  readonly,
  hidden,
  rows,
  error: fieldError,
  inputProps,
}: AppInputProps) {
  // const [_type, setType] = useState(type);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [val, setVal] = useState(value);
  const [error] = useState<string | null>(null);
  const hasFieldError = fieldError && fieldError.length > 0 && fieldError[0];
  // const hasUpdated = useRef(false);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className={hidden ? "hidden" : ""}>
      {title && (
        <label
          htmlFor={`${title}-input`}
          className="inline-block pb-1 text-black-300 text-label"
        >
          {title}
        </label>
      )}
      <div className="relative AppInput z-[1]">
        <span
          className={`absolute inline-block left-3 opacity-60 ${
            textarea ? "top-4" : "top-1/2 -translate-y-1/2"
          }`}
        >
          {icon}
        </span>
        {type === "password" && (
          <button
            type="button"
            role="button"
            onClick={() => setEyeOpen(!eyeOpen)}
            className={`absolute inline-block right-3 ${
              textarea ? "top-4" : "top-1/2 -translate-y-1/2"
            }`}
          >
            {eyeOpen ? <LuEye /> : <LuEyeOff />}
          </button>
        )}
        {textarea ? (
          <textarea
            readOnly={readonly}
            hidden={hidden}
            id={`${title}-input`}
            name={name}
            placeholder={placeholder}
            rows={rows ?? 4}
            value={type === "file" ? undefined : val}
            onChange={(e) => {
              setVal(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className={`app-input ${!icon ? "ps-3" : "ps-9"} ${
              error || fieldError ? "!bg-red-100" : ""
            }`}
          />
        ) : (
          <input
            {...inputProps}
            readOnly={readonly}
            hidden={hidden}
            id={`${title}-input`}
            name={name}
            placeholder={placeholder}
            type={!eyeOpen ? type : "text"}
            value={type === "file" ? undefined : val}
            onChange={(e) => {
              inputProps?.onChange?.(e);
              if (type === "file") return;
              setVal(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className={`app-input ${ps ? ps : !icon ? "ps-4" : "ps-9"} ${
              type === "password" ? "pe-4" : "pe-9"
            }  ${error || hasFieldError ? "!bg-red-100" : ""}`}
          />
        )}
      </div>
      {error && <p className="text-red-900 text-xs">{error}</p>}
      {hasFieldError && <p className="text-red-900 text-xs">{fieldError[0]}</p>}
    </div>
  );
});
