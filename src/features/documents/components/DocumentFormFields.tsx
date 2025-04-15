import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import { Document } from "../../../types/Document";

interface DocumentFormFieldsProps {
  formValues: Omit<Document, "id">;
  onFieldChange: (field: keyof Omit<Document, "id">, value: string) => void;
}

const DocumentFormFields: React.FC<DocumentFormFieldsProps> = ({
  formValues,
  onFieldChange,
}) => {
  const { t } = useTranslation();

  const handleChange = (
    field: keyof Omit<Document, "id">,
    newValue: string | Dayjs
  ) => {
    if (typeof newValue === "string") {
      onFieldChange(field, newValue);
    } else {
      // typeof newValue == Dayjs object
      onFieldChange(field, newValue.toISOString());
    }
  };

  return (
    <>
      <DateTimePicker
        ampm={false}
        label={t("companySigDate")}
        value={dayjs(formValues.companySigDate)}
        onChange={(newValue) => {
          if (newValue) {
            handleChange("companySigDate", newValue);
          }
        }}
      />
      <TextField
        fullWidth
        label={t("companySignatureName")}
        value={formValues.companySignatureName}
        onChange={(e) => handleChange("companySignatureName", e.target.value)}
        required={true}
      />
      <TextField
        fullWidth
        label={t("documentName")}
        value={formValues.documentName}
        onChange={(e) => handleChange("documentName", e.target.value)}
        required={true}
      />
      <TextField
        fullWidth
        label={t("documentStatus")}
        value={formValues.documentStatus}
        onChange={(e) => handleChange("documentStatus", e.target.value)}
        required={true}
      />
      <TextField
        fullWidth
        label={t("documentType")}
        value={formValues.documentType}
        onChange={(e) => handleChange("documentType", e.target.value)}
        required={true}
      />
      <TextField
        fullWidth
        label={t("employeeNumber")}
        value={formValues.employeeNumber}
        onChange={(e) => handleChange("employeeNumber", e.target.value)}
        required={true}
      />
      <DateTimePicker
        ampm={false}
        label={t("employeeSigDate")}
        value={dayjs(formValues.employeeSigDate)}
        onChange={(newValue) => {
          if (newValue) {
            handleChange("employeeSigDate", newValue);
          }
        }}
      />
      <TextField
        fullWidth
        label={t("employeeSignatureName")}
        value={formValues.employeeSignatureName}
        onChange={(e) => handleChange("employeeSignatureName", e.target.value)}
        required={true}
      />
    </>
  );
};

export default DocumentFormFields;
