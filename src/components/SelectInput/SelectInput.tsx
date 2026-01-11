import React from "react";
import { Select, Space } from "antd";
import { useTranslation } from "react-i18next";

const SelectInput: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    console.log(value, "ozgardi");

    localStorage.setItem("i18nextLng", value);
  };

  return (
    <Space wrap>
      <Select
        value={i18n.resolvedLanguage} // 👈 MUHIM
        style={{ width: 150 }}
        onChange={handleChange}
        options={[
          { value: "uz", label: "O‘zbek (lotin)" },
          { value: "ru", label: "Русский" },
          { value: "kaa", label: "Qoraqalpoq" },
          { value: "uz_cyrl", label: "Krill" },
          // krill, qa qo‘shilsa resource bo‘lishi shart
        ]}
      />
    </Space>
  );
};

export default SelectInput;
