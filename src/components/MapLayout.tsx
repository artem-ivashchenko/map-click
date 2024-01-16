import "leaflet/dist/leaflet.css";
import { MapContainer} from "react-leaflet";
import { Box } from "@mui/material";
import MapContent from "./MapContent";

const MapLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
    >
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{flexGrow: 1}}
      >
        <MapContent />
      </MapContainer>
    </Box>
  );
};

export default MapLayout;
