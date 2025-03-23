import { createApi } from "@reduxjs/toolkit/query/react";
import {
    TaskRequest,
    TaskResponse,
    TaskSingleRequest,
    TasksResponse,
} from "@/lib/types/task";
import axiosBaseQuery from "@/lib/axios/axios-base-query";
import {SingleRequest} from "@/lib/types";

export const taskApi = createApi({
    reducerPath: "taskService",
    tagTypes: ["Tasks", "id"],
    baseQuery: axiosBaseQuery({}),
    endpoints: (builder) => ({
        getAllTasks: builder.query<TasksResponse, void>({
            query: () => {
                return {
                    url: `/task`,
                };
            },
            keepUnusedDataFor: 3600,
            providesTags: () => {
                return [{ type: "Tasks", id: "id" }];
            },
            transformResponse: (response: { data: TasksResponse }) =>
                response.data,
        }),

        getTask: builder.query<TaskResponse, SingleRequest>({
            query: ({ id }: SingleRequest) => {
                return {
                    url: `/task/${id}`,
                };
            },
            keepUnusedDataFor: 3600,

            transformResponse: (response: { data: TaskResponse }) =>
                response.data,
        }),

        createTask: builder.mutation<TaskResponse, TaskRequest>({
            query({ ...args }: TaskRequest) {
                return {
                    url: "/task",
                    method: "post",
                    data: { ...args },
                };
            },
            invalidatesTags: ["Tasks"],
        }),

        updateTask: builder.mutation<
            TaskResponse,
            TaskSingleRequest
        >({
            query({ id, ...args }: TaskSingleRequest) {
                return {
                    url: `/task/${id}`,
                    method: "patch",
                    data: { ...args },
                };
            },
            invalidatesTags: ["Tasks", "id"],
        }),

        deleteTask: builder.mutation<unknown, SingleRequest>({
            query({ id }: TaskSingleRequest) {
                return {
                    url: `/task/${id}`,
                    method: "delete",
                };
            },
            invalidatesTags: ["Tasks", "id"],
        }),
    }),
});

export const {
    useGetAllTasksQuery,
    useGetTaskQuery,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useCreateTaskMutation,
} = taskApi;
export default taskApi.reducer;
