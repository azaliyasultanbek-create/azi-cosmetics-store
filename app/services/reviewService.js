import axios from "axios";

const API_URL = "https://dummyjson.com/comments";

export const getReviews = async () => {
  const res = await axios.get(API_URL);
  return res.data.comments;
};
export const createReview = async (review) => {
  try {
    const res = await axios.post(`${API_URL}/add`, review);
    return res.data;
  } catch {
    return review; 
  }
};

export const deleteReview = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch {}
};

export const updateReview = async (id, updated) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updated);
    return res.data;
  } catch {
    return updated;
  }
};