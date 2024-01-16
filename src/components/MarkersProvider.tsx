import {  useMemo, useState } from "react";
import MarkerType from "../types/MarkerType";
import { GlobalContext, ContextProps } from "../store/global";

type Props = {
  children: React.ReactNode,
}

const MarkersProvider: React.FC<Props> = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [count, setCount] = useState(1);
  const [path, setPath] = useState('dots');

  const value = useMemo(() => ({
    path,
    markers,
    count,
    setMarkers,
    setCount,
    setPath,
  }) as ContextProps, [markers, count, path]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export default MarkersProvider;