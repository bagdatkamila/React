// src/features/items/itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems, getItemById } from "../../services/itemsService";

// Async Thunks
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (query) => {
    const data = await getItems(query);
    return data;
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id) => {
    const data = await getItemById(id);
    return data;
  }
);

// Slice
const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    selectedItem: null,

    loadingList: false,
    loadingItem: false,

    errorList: null,
    errorItem: null,

    query: "",
  },

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },

  extraReducers: (builder) => {
    // LIST
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loadingList = false;
        state.errorList = "Failed to load book list";
      });

    // DETAILS
    builder
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state) => {
        state.loadingItem = false;
        state.errorItem = "Failed to load book details";
      });
  },
});

export const { setQuery } = itemsSlice.actions;
export default itemsSlice.reducer;
