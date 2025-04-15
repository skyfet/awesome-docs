import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"), // Проверяем локальное хранилище на наличие токена
  loading: false,
  error: null,
};

async function loginRequest(
  username: string,
  password: string
): Promise<string> {
  const response = await fetch(
    "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );

  const result = await response.json();

  if (result.error_code !== 0 || !result.data?.token) {
    throw new Error(result.error_text || "Ошибка авторизации");
  }

  return result.data.token;
}

export const loginThunk = createAsyncThunk<
  string, // Тип возвращаемого результата (токена)
  { username: string; password: string }, // Тип передаваемых аргументов
  { rejectValue: string } // Тип ошибки
>("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const token = await loginRequest(username, password);
    return token;
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка авторизации");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

// Селекторы, чтобы UI мог получать из стейта
export const selectIsAuthorized = (state: RootState) => state.auth.token !== null;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
