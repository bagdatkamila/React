import axios from "axios";

const API_BASE = "https://openlibrary.org";

export async function getItems(query) {
  const response = await axios.get(`${API_BASE}/search.json?q=${query}`);
  return response.data.docs.slice(0, 20); // Limit results
}

export async function getItemById(id) {
  const response = await axios.get(`${API_BASE}/works/${id}.json`);
  return response.data;
}
