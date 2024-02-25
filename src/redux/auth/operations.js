import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const createUser = createAsyncThunk(
  "auth/create-request-token",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/authentication/token/new");
      const requestToken = response.data.request_token;
      console.log(requestToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password, request_token }, thunkAPI) => {
    try {
      const response = await axios.post(
        "/authentication/token/validate_with_login",
        {
          username,
          password,
          request_token,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete("/authentication/session");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
