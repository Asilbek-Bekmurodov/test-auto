import React from "react";
import { Select, Space } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const SelectInput: React.FC = () => (
  <Space wrap>
    <Select
      defaultValue="uz"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: "uz", label: "O’zbek(lotin)" },
        { value: "krill", label: "Ўзбек(крилл)" },
        { value: "qa", label: "Qaraqalpaq" },
        { value: "ru", label: "Русский" },
      ]}
    />
  </Space>
);

export default SelectInput;
