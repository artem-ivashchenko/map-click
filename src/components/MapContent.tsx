import { useContext, useEffect } from "react";
import { TileLayer, useMapEvents } from "react-leaflet";
import MarkerType from "../types/MarkerType";
import { GlobalContext } from "../store/global";
import MarkerLayout from "./MarkerLayout";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const MapContent: React.FC = () => {
  const { path, markers, count, setCount, setMarkers,setPath} = useContext(GlobalContext);

  const db = getFirestore();

  useMapEvents({
    click: (e) => {
      handleMapClick(e);
    },
  });

  useEffect(() => {
    async function getAllPath() {
      let currCount = 0;
      let exists = true;
      let currPath = path;
      const newMarkers: MarkerType[] = [];

      while (exists) {
        const collectionRef = collection(db, currPath);
        const querySnapshot = await getDocs(collectionRef);

        if (!querySnapshot.empty) {
          const id = querySnapshot.docs[0].id;
          const detailed = querySnapshot.docs[0].data();
          const newDetail = {...detailed, location: JSON.parse(detailed.location), id} as MarkerType;

          newMarkers.push(newDetail);
          currPath = `${currPath}/${id}/Sub${id}`
          currCount++;
        } else {
          exists = false;
        }
      }

      setPath(currPath);
      setMarkers(newMarkers);
      setCount(currCount);
    }

    getAllPath();
  }, []);

  const handleMapClick = async (e: any) => {
    let currPath = path;
    const timestamp = serverTimestamp();
    const newMarker: MarkerType = {
      number: count+1,
      location: e.latlng,
      timestamp,
      id: `Quest${count+1}`,
    };

    setPath(prev => `${prev}/Quest${count+1}/SubQuest${count+1}`)
    setCount((prev) => prev + 1);
    setMarkers((prev: MarkerType[]) => [...prev, newMarker]);
    
    await setDoc(doc(db, currPath, `Quest${count+1}`), {
      location: JSON.stringify(e.latlng),
      number: count+1,
      timestamp
    });
  };

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => (
        <MarkerLayout marker={marker} key={marker.number} path={path} />
      ))}
    </>
  );
};

export default MapContent;
