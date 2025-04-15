import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Alert,
} from "@mui/material";
import CreateDocumentModal from "./CreateDocumentModal";
import EditDocumentModal from "./EditDocumentModal";
import DocumentsTable from "./components/DocumentsTable";
import { Document } from "../../types/Document";
import { useTranslation } from "react-i18next";
import LogoutButton from "../auth/LogoutButton";
import Add from "@mui/icons-material/Add";
import { useGetDocumentsQuery } from "./documentsApi";
import { getErrorMessage } from "../../app/utils/get_error_message";

const DocumentsPage: React.FC = () => {
  const { t } = useTranslation();

  const { data: documents, isLoading, error } = useGetDocumentsQuery();

  // Модалки
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);

  // Открыть/закрыть модалки
  const handleCreate = () => setOpenCreateModal(true);
  const handleCreateClose = () => setOpenCreateModal(false);
  const handleEdit = (doc: Document) => setEditingDoc(doc);
  const handleEditClose = () => setEditingDoc(null);

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("documentsTitle") /* «Список документов» */}
          </Typography>

          <LogoutButton />
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        {/* Кнопка «Создать» */}
        <Button variant="text" onClick={handleCreate}>
          <Add />
          {t("createLine")}
        </Button>

        {/* Глобальный лоадер при initial fetch */}
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}

        {/* Глобальная ошибка при initial fetch */}
        {error && <Alert severity="error">{getErrorMessage(error)}</Alert>}

        {/* Таблица документов */}
        {!isLoading && !error && (
          <DocumentsTable
            documents={documents || []}
            onEdit={handleEdit}
            // Удаление внутри
          />
        )}

        {/* Модалка создания */}
        <CreateDocumentModal
          open={openCreateModal}
          onClose={handleCreateClose}
        />

        {/* Модалка редактирования */}
        {editingDoc && (
          <EditDocumentModal doc={editingDoc} onClose={handleEditClose} />
        )}
      </Box>
    </>
  );
};

export default DocumentsPage;
