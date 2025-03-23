import {taskSchema} from "@/lib/zod-schemas/task";
import {z} from "zod";
import {SingleRequest} from "@/lib/types/index";

export type  CadenceType = "day" | "week" | "month";

export type TaskType = z.infer<typeof taskSchema>;
export type TaskDocType = TaskType & { id: string };
export type TaskWithChildren = TaskDocType & { children?: TaskDocType[] };

export type TaskRequest = Partial<TaskType>;
export type TaskSingleRequest = TaskRequest & SingleRequest;
export type TasksResponse = Array<TaskDocType>;
export type TaskResponse = TaskDocType;
