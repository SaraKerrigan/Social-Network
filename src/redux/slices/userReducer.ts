import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginResponse, PostT, User } from "../../types";
import axiosInstance, { setAccessToken } from "../../axiosInstance";

type InitialState = {
  profile: User | null;
  userPosts: PostT[];
  isUserPostsLoading: boolean;
};

const initialState: InitialState = {
  profile: null,
  userPosts: [],
  isUserPostsLoading: false,
};

const getProfile = createAsyncThunk<User, string>("user/getProfile", (id) => {
  return axiosInstance.get(`/users/${id}`).then((res) => res.data);
});

const getProfilePosts = createAsyncThunk<PostT[], string>(
  "user/getProfilePosts",
  (id) => {
    return axiosInstance
      .get(`/users/${id}/posts`)
      .then((res) => res.data.posts);
  }
);

const handleLogin = createAsyncThunk<
  LoginResponse,
  { username: string; password: string }
>("user/handleLogin", (values) => {
  return axiosInstance.post(`/user/login`, values).then((res) => res.data);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getProfilePosts.pending, (state) => {
      state.isUserPostsLoading = true;
    });
    builder.addCase(getProfilePosts.fulfilled, (state, action) => {
      state.userPosts = action.payload;
      state.isUserPostsLoading = false;
    });

    builder.addCase(getProfilePosts.rejected, (state) => {
      state.isUserPostsLoading = false;
    });

    builder.addCase(handleLogin.fulfilled, (_, action) => {
      setAccessToken(action.payload.accessToken);
    });
  },
});

export { getProfile, getProfilePosts, handleLogin };

export const {} = userSlice.actions;

export const userReducer = userSlice.reducer;
