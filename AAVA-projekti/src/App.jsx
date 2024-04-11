import './App.css'

import { Link, Outlet } from "react-router-dom";


function App() {
  return (


/* NÄIHIN VOI LISÄTÄ NAVI BAR LINKKEJÄ */
    <>
      <nav>
        <Link to={"/"}>Etusivu</Link>
        <Link to={"/kysymyslista"}>Kysymyslista</Link>

      </nav>
      <Outlet />

    </>
  )

}

export default App