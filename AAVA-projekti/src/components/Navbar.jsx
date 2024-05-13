import { Link } from "react-router-dom";

export default function Navbar() {


    return (
        <>
            <div className="App">
                <p><Link to="/">Etusivu</Link></p>
                <p><Link to="/diagrammi">Kuvaaja</Link></p>
            </div>
        </>
    )
}