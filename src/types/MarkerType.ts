import { FieldValue } from 'firebase/firestore';
import { LatLngExpression } from 'leaflet';

type MarkerType = {
  location: LatLngExpression,
  number: number,
  id: string,
  timestamp: FieldValue
}

export default MarkerType