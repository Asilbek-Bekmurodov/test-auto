import { useRef } from "react";

interface OTPInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;

    // keyingi inputga o'tish
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    const otpValue = inputsRef.current.map((input) => input?.value || "").join("");
    onChange(otpValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !inputsRef.current[index].value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => {
            if (el) inputsRef.current[i] = el;
          }}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          style={{
            width: "45px",
            height: "55px",
            fontSize: "22px",
            textAlign: "center",
            border: "2px solid #ddd",
            borderRadius: "8px",
          }}
        />
      ))}
    </div>
  );
}
