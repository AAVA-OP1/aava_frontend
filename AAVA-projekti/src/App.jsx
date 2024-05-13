import './App.css'
// import { Button } from '@mui/material';
// import { Link, Outlet } from "react-router-dom";
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Diagrammi from './components/Diagrammi'

function App() {
  return (


/* NÄIHIN VOI LISÄTÄ NAVI BAR LINKKEJÄ */
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagrammi" element={<Diagrammi />} />
      </Routes>
      {/* <nav>
        <Link to={"/"}><Button variant='contained'>Etusivu</Button></Link>
        <Link to={"/diagrammi"}><Button variant='contained' style={{marginLeft: 15}}>Kuvaaja</Button></Link>

      </nav>
      <Outlet /> */}
      

    </>
  )

}

export default App