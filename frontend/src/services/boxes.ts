import axios from "axios";
import { Box, BoxInput } from "../types";
const address = import.meta.env.VITE_BACKEND_URL;

export const getBoxes = async () => {
  const res = await axios.get<Box[]>(`${address}/boxes`);
  const boxes = res.data;
  return boxes;
};

export const addBox = async (box: BoxInput) => {
  const res = await axios.post<Box>(`${address}/boxes`, box);
  const newBox = res.data;
  return newBox;
};

export const updateBox = async (box: Box) => {
  const res = await axios.put<Box>(`${address}/boxes/${box.id}`, box);
  const updatedBox = res.data;
  return updatedBox;
};
