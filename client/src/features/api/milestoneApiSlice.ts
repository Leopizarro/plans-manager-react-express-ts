import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { projectsApiSlice } from "./projectsApiSlice"

interface Milestone {
    id: number
    title: string,
    description: string,
    completedAt: Date | null,
    observation: string,
    projectId: number,
    projectActivityImportanceId: number,
    milestoneStageId: number
  }

export const milestonesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_ROOT_URL}/project-milestones`}),
  reducerPath: "milestonesApi",
  // Used for caching and invalidation.
  tagTypes: ["Milestones"],
  endpoints: build => ({
    createProjectMilestone: build.mutation<Milestone, Partial<Milestone>>({
      query: (body) => {
        return {
            url: '/create',
            method: 'POST',
            body
        }
      },
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(
            projectsApiSlice.util.invalidateTags(["Projects"])
          );
        });
      },
      invalidatesTags: ['Milestones'],
    }),
  }),
})

// Hooks are auto-generated by RTK-Query
export const { useCreateProjectMilestoneMutation } = milestonesApiSlice;