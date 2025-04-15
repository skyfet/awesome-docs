import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DocumentRow from "./DocumentRow";
import { Document } from "../../../types/Document";
import { useTranslation } from "react-i18next";

interface DocumentsTableProps {
  documents: Document[];
  onEdit: (doc: Document) => void;
}

/**
 * Таблица, которая отображает список документов
 */
const DocumentsTable: React.FC<DocumentsTableProps> = ({
  documents,
  onEdit,
}) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t("id")}</TableCell>
          <TableCell>{t("companySigDate")}</TableCell>
          <TableCell>{t("companySignatureName")}</TableCell>
          <TableCell>{t("documentName")}</TableCell>
          <TableCell>{t("documentStatus")}</TableCell>
          <TableCell>{t("documentType")}</TableCell>
          <TableCell>{t("employeeNumber")}</TableCell>
          <TableCell>{t("employeeSigDate")}</TableCell>
          <TableCell>{t("employeeSignatureName")}</TableCell>
          <TableCell>{/* Actions */}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {documents.map((doc) => (
          <DocumentRow key={doc.id} doc={doc} onEdit={onEdit} />
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentsTable;
