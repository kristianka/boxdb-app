import axios from "axios";
import { Box } from "../types";

const address = "http://localhost:3000";

export const getBoxes = async () => {
  const res = await axios<Box[]>(`${address}/boxes`);
  const boxes = res.data;
  return boxes;
};
