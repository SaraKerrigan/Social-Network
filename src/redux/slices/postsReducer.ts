import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { PostT } from "../../types";
import { sortValues } from "./filtersReducer";
import axiosInstance from "../../axiosInstance";
import type { RootState } from "../store";

type InitialState = {
  postsList: PostT[];
  favoritePosts: PostT[];
  isPostsLoading: boolean;
};

const initialState: InitialState = {
  postsList: [],
  favoritePosts: [],
  isPostsLoading: false,
};

const getAllPosts = createAsyncThunk<PostT[], void, { state: RootState }>(
  "posts/getAllPosts",
  (_, { getState }) => {
    const state = getState();
    //  getState() - позволяет получить состояния из других редюсеров     { state: RootState } - это тип для getState()

    // посты могут быть переиспользуемыми, поэтому используем редюсер

    let url = "/posts";

    if (state.filters.search) {
      url += `/search?q=${state.filters.search}`;
    } else {
      if (state.filters.tag) {
        url += `/tag/${state.filters.tag}`;
      }
      if (state.filters.sort) {
        url += `?sortBy=${sortValues[state.filters.sort].sortBy}&order=${
          sortValues[state.filters.sort].order
        }`;
      }
    }

    return axiosInstance.get(url).then((res) => res.data.posts);
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<PostT>) => {
      //  <Post> это type Post
      const post = state.favoritePosts.find(
        (el) => el.id === action.payload.id
        // el это post
      );
      if (post) {
        state.favoritePosts = state.favoritePosts.filter(
          (el) => el.id != post.id
        );
      } else {
        state.favoritePosts.push(action.payload);
        // action.payload - в данном случае это post
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isPostsLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isPostsLoading = false;
      state.postsList = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.isPostsLoading = false;
    });
  },
});
export { getAllPosts };

export const { toggleFavorite } =
  postsSlice.actions;

export const postsReducer = postsSlice.reducer;
