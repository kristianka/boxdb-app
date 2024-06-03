import axios from "axios";
import { Box } from "../types";
const address = import.meta.env.VITE_BACKEND_URL;

export const getBoxes = async () => {
  const res = await axios<Box[]>(`${address}/boxes`);
  const boxes = res.data;
  return boxes;
};
