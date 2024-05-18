import { create } from "zustand";
const useDocorStore = create((set) => ({
    doctores: [],
    fetchDoctor: async () => {
            const data = await fetchDoctor();
            set({ doctores: data.data });
        }
}));

export default usehorarioStore;
