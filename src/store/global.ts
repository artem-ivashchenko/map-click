import { createContext } from "react";
import MarkerType from "../types/MarkerType";

export type ContextProps = {
  markers: MarkerType[];
  count: number;
  path: string
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
  setPath: React.Dispatch<React.SetStateAction<string>>
}

const defaultContextValue: ContextProps = {
  markers: [],
  count: 1,
  path: 'dots',
  setCount: () => {
    throw new Error('Markers context is not found');
  },
  setMarkers: () => {
    throw new Error('Markers context is not found');
  },
  setPath: () => {
    throw new Error('Markers context is not found');
  },
};

export const GlobalContext = createContext<ContextProps>(defaultContextValue);

