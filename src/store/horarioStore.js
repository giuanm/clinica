import { create } from "zustand";
const usehorarioStore = create((set) => ({
  citas: [],
  fetchHorarioByidDoctor: async (idDoctor) => {
        const data = await fetchHorarioByidDoctor(idDoctor);
        set({ horarios: data.data });
    }
}));

export default usehorarioStore;
