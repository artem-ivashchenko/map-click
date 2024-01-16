import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { useContext } from 'react';
import { GlobalContext } from '../store/global';
import { collection, deleteDoc, doc, getDocs, getFirestore} from 'firebase/firestore';

const Header: React.FC = () => {
  const {path, count, markers, setCount, setMarkers, setPath } = useContext(GlobalContext);
  const db = getFirestore();

  const handleAllDelete = async () => {
    setMarkers([]);
    setCount(1);
    setPath('dots');

    // try {
    //   const dotsRef = collection(db, 'dots');
    //   const querySnapshot = await getDocs(dotsRef);
    //   querySnapshot.forEach(async (doc) => {
    //     await deleteDoc(doc.ref);
    //   });

    //   await deleteDoc(doc(db, 'dots'));
    // } catch(e) {
    //   setMarkers(markers);
    //   setCount(count);
    //   setPath(path);
    // }
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{
          display: 'flex',
          gap: '20px',
        }}>
          <MapIcon />
          
          <Typography variant="h6" component="div" >
            Map click
          </Typography>

          <Button 
            variant='contained' 
            onClick={handleAllDelete}
            sx={{ bgcolor: '#5b7bb2' }}
          >
            Clear all
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
