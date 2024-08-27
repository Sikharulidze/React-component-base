import { create } from "zustand";
import { getAllSvg } from "../services/scg-components-service";
import { SvgComponentType } from "../types";

type SvgComponentsState = {
  components: SvgComponentType[];
  fetchSvgComponents: () => Promise<void>;
};

const useSvgComponents = create<SvgComponentsState>((set) => ({
  components: [],
  fetchSvgComponents: async () => {
    try {
      const response = await getAllSvg();
      set({ components: response.data });
    } catch (error) {
      console.error("Failed to fetch SVG components:", error);
    }
  },
}));

export default useSvgComponents;
