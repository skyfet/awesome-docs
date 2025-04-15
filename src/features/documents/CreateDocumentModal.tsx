import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Document } from "../../types/Document";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DocumentFormFields from "./components/DocumentFormFields";
import { isFormValid } from "./documentValidation";
import { useCreateDocumentMutation } from "./documentsApi";
import { getErrorMessage } from "../../app/utils/get_error_message";

interface Props {
  open: boolean;
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

const defaultFormValues = {
  companySigDate: new Date().toISOString(),
  companySignatureName: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeNumber: "",
  employeeSigDate: new Date().toISOString(),
  employeeSignatureName: "",
};

const CreateDocumentModal: React.FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [createDocument, { isLoading, error }] = useCreateDocumentMutation();

  const [formValues, setFormValues] =
    useState<Omit<Document, "id">>(defaultFormValues);

  const handleFieldChange = (
    field: keyof Omit<Document, "id">,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isFormValid(formValues)) return;

    try {
      await createDocument(formValues).unwrap();
      setFormValues(defaultFormValues);
      onClose();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleClose = () => {
    // setFormValues(defaultFormValues); // Сброс при закрытии
    onClose();
  };

  const formValid = isFormValid(formValues);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6">{t("createLine")}</Typography>

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
          disabled={!formValid || isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : t("create")}
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

export default CreateDocumentModal;
