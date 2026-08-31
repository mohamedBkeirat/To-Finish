import type { Dayjs } from "dayjs";

export type Task = {
  task: string;
  description: string;
  id: string;
  date: Dayjs;
};