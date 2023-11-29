import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  setUser: (item) => set((state) => ({ user: item })),
  resetUser: () => set((state) => ({ user: null })),
  visitors: [0],
  setVisitors: (count) => set((state) => ({ visitors: count })),
  projects: [],
  addProject: (item) =>
    set((state) => ({ projects: [item, ...state.projects] })),
  setProjects: (project) => set((state) => ({ projects: project })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((item) => item.id != id),
    })),
  globalLoading: true,
  setGlobalLoading: (val) => set((state) => ({ globalLoading: val })),
}));
