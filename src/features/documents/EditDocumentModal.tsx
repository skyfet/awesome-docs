import { useState } from "react";
import { useUpdateDocumentMutation } from "./documentsApi";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Document } from "../../types/Document";
import { useTranslation } from "react-i18next";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DocumentFormFields from "./components/DocumentFormFields";
import { isFormValid } from "./documentValidation";
import { getErrorMessage } from "../../app/utils/get_error_message";

interface Props {
  doc: Document;
  onClose: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: 4,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: 400,
};

const EditDocumentModal: React.FC<Props> = ({ doc, onClose }) => {
  const { t } = useTranslation();
  const [updateDocument, { isLoading, error }] = useUpdateDocumentMutation();

  const [formValues, setFormValues] = useState<Omit<Document, "id">>({
    companySigDate: doc.companySigDate,
    companySignatureName: doc.companySignatureName,
    documentName: doc.documentName,
    documentStatus: doc.documentStatus,
    documentType: doc.documentType,
    employeeNumber: doc.employeeNumber,
    employeeSigDate: doc.employeeSigDate,
    employeeSignatureName: doc.employeeSignatureName,
  });

  const handleFieldChange = (
    field: keyof Omit<Document, "id">,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isFormValid(formValues)) return;

    await updateDocument({ id: doc.id, doc: formValues }).unwrap();
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">{t("editLine")}</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DocumentFormFields
            formValues={formValues}
            onFieldChange={handleFieldChange}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid(formValues) || isLoading}
        >
          {isLoading && <CircularProgress size={24} />}
          {t("save")}
        </Button>
        {!!error && (
          <Alert severity="error">
            {t("errorLabel", { message: getErrorMessage(error) })}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default EditDocumentModal;
