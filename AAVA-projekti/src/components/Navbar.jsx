import { BottomNavigation, Button } from "@mui/material";
import { Link } from "react-router-dom";


export default function Navbar() {


    return (
        <>
            <div className="App">
                <Button variant="contained" style={{marginRight: "15px"}}><Link to="/" style={{color: "white", textDecoration: "none"}}>Etusivu</Link></Button>
                <Button variant="contained"><Link to="/diagrammi" style={{color: "white", textDecoration: "none"}}>Kuvaaja</Link></Button>
            </div>
        </>
    )
}