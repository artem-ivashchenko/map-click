import './api/firebase'; 
import { getFirestore, addDoc, collection } from "firebase/firestore"; 
import {Stack} from '@mui/material';
import Header from './components/Header';
import MapLayout from './components/MapLayout';

function App() {
  return (
    <Stack minHeight="100vh">
      <Header />
      <MapLayout />
    </Stack>
  );
}

export default App;