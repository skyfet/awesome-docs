import dayjs from "../../app/dayjs-setup";
import { Document } from "../../types/Document";

export function isFormValid(formValues: Omit<Document, "id">): boolean {
  const {
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName,
  } = formValues;

  // Проверка на пустые строки
  if (!companySignatureName.trim()) return false;
  if (!documentName.trim()) return false;
  if (!documentStatus.trim()) return false;
  if (!documentType.trim()) return false;
  if (!employeeNumber.trim()) return false;
  if (!employeeSignatureName.trim()) return false;

  // Проверка корректности дат
  if (!companySigDate.trim() || !dayjs(companySigDate).isValid()) return false;
  if (!employeeSigDate.trim() || !dayjs(employeeSigDate).isValid())
    return false;

  return true;
}
