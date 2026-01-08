import "./Toggle.css";

interface ToggleProps {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        hidden
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check" className="relative"></label>
    </div>
  );
};
