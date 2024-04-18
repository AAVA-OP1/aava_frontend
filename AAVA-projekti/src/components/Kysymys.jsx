import { useState } from "react";

export default function Kysymys(props) {


    // vastauskenttä
    // onChange
    const [vastaus, setVastaus] = useState({
        kysymysid: '',
        vastauksensisalto: ''
    });
    

    return (
        <>
          
        <p>Moi</p>

        </>
    );
}