import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Sort } from "../../types";
import axiosInstance from "../../axiosInstance";

type SortValues = {
  [key: number]: {
    sortBy: string;
    order: "asc" | "desc";
  };
};

export const sortValues: SortValues = {
  0: { sortBy: "id", order: "asc" },
  1: { sortBy: "views", order: "desc" },
  2: { sortBy: "views", order: "asc" },
  3: { sortBy: "body", order: "desc" },
  4: { sortBy: "body", order: "asc" },
  5: { sortBy: "title", order: "asc" },
};

type InitialState = {
  sort: Sort;
  tag: string;
  search: string;
  tags: string[];
  loadingTags: boolean;
};

// sort - на странице SortBy - первое значение default, потом views (order: "asc" - стрелка вверх, order: "desc" - стрелка вниз)

const initialState: InitialState = {
  sort: "0",
  tag: "",
  search: "",
  tags: [],
  loadingTags: true,
};

// asc - сортировка по возврастанию
// desc - сортировка по убыванию
const getTags = createAsyncThunk<string[]>("filters/getTags", () => {
  return axiosInstance.get("/posts/tag-list").then((res) => res.data);
});

// export const fetchTags = createAsyncThunk<TagList>(
//   "filters/fetchTags",
//   async () => {
//     const res = await axiosInstance.get<TagList>("/posts/tag-list");
//     return res.data.slice(0, 21);
//   }
// );

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setTag: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearFilters: (state) => {
      state.sort = "0";
      state.tag = "";
      state.search = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.loadingTags = true;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.loadingTags = false;
        state.tags = action.payload.slice(0, 21);
      })
      .addCase(getTags.rejected, (state) => {
        state.loadingTags = false;
        state.tags = [];
      });
  },
});

export { getTags };

export const { setSort, setTag, setSearch, clearFilters } = filterSlice.actions;

export const filtersReducer = filterSlice.reducer;
