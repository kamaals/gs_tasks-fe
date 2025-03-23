import { z } from "zod";
const { boolean, date, object, string } = z;

const number = z.string().transform((v) => Number(v));

export const taskSchema = object({
  title: string(),
  description: string().optional(),
  parentId: string().optional(),
  done: boolean().optional(),
  cadence: z.enum(["day", "week", "month"]).optional(),
  priority: number,
  lastGeneratedTime: date().optional(),
  recurTime: date().optional(),
  recurTimes: string().optional(),
});
