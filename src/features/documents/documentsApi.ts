import { Document } from "../../types/Document";
import { RootState } from "../../app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function transformDocumentResponse(response: {
  error_code: number | null;
  error_text: string | null;
  data: Document & Document[];
}) {
  if (response.error_code !== 0) {
    throw new Error(response.error_text || "Request error.");
  }
  return response.data;
}

export const documentsApi = createApi({
  reducerPath: "documents",
  tagTypes: ["Document"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("x-auth", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], void>({
      query: () => "get",
      transformResponse: transformDocumentResponse,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Document" as const, id })),
              { type: "Document", id: "LIST" },
            ]
          : [{ type: "Document", id: "LIST" }],
    }),
    createDocument: builder.mutation<Document, Omit<Document, "id">>({
      query: (doc) => ({
        url: "create",
        method: "POST",
        body: doc,
      }),
      transformResponse: transformDocumentResponse,
      invalidatesTags: [{ type: "Document", id: "LIST" }],
    }),
    updateDocument: builder.mutation<
      Document,
      { id: string; doc: Omit<Document, "id"> }
    >({
      query: ({ id, doc }) => ({
        url: `set/${id}`,
        method: "POST",
        body: doc,
      }),
      transformResponse: transformDocumentResponse,
      invalidatesTags: (doc) => [{ type: "Document", id: doc?.id }],
    }),
    deleteDocument: builder.mutation<string, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Document", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
} = documentsApi;
