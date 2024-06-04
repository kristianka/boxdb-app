import axios from "axios";
import { Box } from "../types";
const address = import.meta.env.VITE_BACKEND_URL;

export const getBoxes = async () => {
  const res = await axios.get<Box[]>(`${address}/boxes`);
  const boxes = res.data;
  return boxes;
};

export const addBox = async (box: Box) => {
  const res = await axios.post(`${address}/boxes`, box);
  const newBox = res.data;
  return newBox;
}