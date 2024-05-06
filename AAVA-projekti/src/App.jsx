import './App.css'
import { Button } from '@mui/material';
import { Link, Outlet } from "react-router-dom";


function App() {
  return (


/* NÄIHIN VOI LISÄTÄ NAVI BAR LINKKEJÄ */
    <>
      <nav>
        <Link to={"/"}><Button variant='contained'>Etusivu</Button></Link>
        <Link to={"/diagrammi"}><Button variant='contained' style={{marginLeft: 15}}>Kuvaaja</Button></Link>

      </nav>
      <Outlet />

    </>
  )

}

export default App