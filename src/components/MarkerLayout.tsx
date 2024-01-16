import { Marker, Popup } from "react-leaflet";
import MarkerType from "../types/MarkerType";
import { DivIcon } from "leaflet";
import React, { useContext, useMemo, useRef } from "react";
import { GlobalContext } from "../store/global";
import { Button } from "@mui/material";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

type Props = {
  marker: MarkerType;
  path: string,
};

const CustomIcon = (number: number) =>
  new DivIcon({
    html: `
      <div class="icon-wrap">
        <img 
          class="image-icon"
          src="geomarker.png"  
        />
        <div class="text-icon">
          ${number}
        </div>
      </div>
    `,
    iconSize: [38, 38],
  });

const MarkerLayout: React.FC<Props> = ({ marker }) => {
  const { setMarkers, path } = useContext(GlobalContext);
  const markerRef = useRef<any>(null);

  const db = getFirestore();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    setMarkers((prev) =>
      prev.filter((currMark) => {
        return currMark.number !== marker.number;
      })
    );
  };

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const markerElement = markerRef.current;
        if (markerElement != null) {
          setMarkers((prev) =>
            prev.map((currMark) => {
              if (currMark.number === marker.number) {
                return {
                  ...currMark,
                  location: markerElement.getLatLng(),
                } as MarkerType;
              }

              return currMark;
            })
          );
          
          let resultPath:string[] = [];
          for(const part of path.split('/')) {
            resultPath.push(part);

            if(part === marker.id) {
              break;
            }
          }
          
          const docRef = doc(db, resultPath.join('/'));
          await updateDoc(docRef, {
            location: JSON.stringify(markerElement.getLatLng())
          })
        }
      },
    }),
    []
  );

  return (
    <Marker
      eventHandlers={eventHandlers}
      position={marker.location}
      icon={CustomIcon(marker.number)}
      draggable={true}
      ref={markerRef}
    >
      <Popup>
        <Button
          variant="contained"
          onClick={handleDelete}
          sx={{
            bgcolor: "#5b7bb2",
          }}
        >
          Clear
        </Button>
      </Popup>
    </Marker>
  );
};

export default React.memo(MarkerLayout, (prev, next) => {
  return (
    JSON.stringify(prev.marker.location) ===
    JSON.stringify(next.marker.location)
  );
});
