import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      // Логин
      loginTitle: "Авторизация",
      loginUsernameLabel: "Логин",
      loginPasswordLabel: "Пароль",
      loginButton: "Войти",

      // Страница документов / таблица
      id: "ID",
      documentsTitle: "Список документов",
      createLine: "Создать запись",
      edit: "Изменить",
      delete: "Удалить",
      companySigDate: "Дата подписи компании",
      companySignatureName: "Подпись компании",
      documentName: "Название документа",
      documentStatus: "Статус",
      documentType: "Тип документа",
      employeeNumber: "Номер сотрудника",
      employeeSigDate: "Дата подписи сотрудника",
      employeeSignatureName: "Подпись сотрудника",

      // Общее
      editLine: "Изменить запись",
      create: "Создать",
      save: "Сохранить",

      errorLabel: "Ошибка: {{message}}",
      loadingLabel: "Загрузка...",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru", // язык по умолчанию
  interpolation: { escapeValue: false },
});

export default i18n;
