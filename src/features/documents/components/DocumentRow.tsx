import {
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Document } from "../../../types/Document";
import { useDeleteDocumentMutation } from "../documentsApi";
import dayjs from "../../../app/dayjs-setup";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../../app/utils/get_error_message";

interface DocumentRowProps {
  doc: Document;
  onEdit: (doc: Document) => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ doc, onEdit }) => {
  const { t } = useTranslation();

  const [deleteDocument, { isLoading: isDeleting, error: deleteError }] =
    useDeleteDocumentMutation();

  const handleDelete = async () => {
    try {
      await deleteDocument(doc.id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableRow>
      <TableCell>{doc.id}</TableCell>
      <TableCell>
        {dayjs(doc.companySigDate).format("DD.MM.YYYY HH:mm")}
      </TableCell>
      <TableCell>{doc.companySignatureName}</TableCell>
      <TableCell>{doc.documentName}</TableCell>
      <TableCell>{doc.documentStatus}</TableCell>
      <TableCell>{doc.documentType}</TableCell>
      <TableCell>{doc.employeeNumber}</TableCell>
      <TableCell>
        {dayjs(doc.employeeSigDate).format("DD.MM.YYYY HH:mm")}
      </TableCell>
      <TableCell>{doc.employeeSignatureName}</TableCell>
      <TableCell>
        {/* Кнопка Изменить */}
        <Button onClick={() => onEdit(doc)}>{t("edit")}</Button>

        {/* Кнопка Удалить со спиннером */}
        <Button
          color="error"
          onClick={handleDelete}
          disabled={isDeleting} // блокируем, пока идёт запрос
        >
          {isDeleting && <CircularProgress size={16} />} {t("delete")}
        </Button>

        {/* Сообщение об ошибке удаления */}
        {!!deleteError && (
          <Alert severity="error">{getErrorMessage(deleteError)}</Alert>
        )}
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
