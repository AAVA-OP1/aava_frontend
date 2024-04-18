import { useState } from "react";
import TextField from '@mui/material/TextField';

export default function Kysymys(props) {


    // vastauskenttä
    // onChange
    const [vastaus, setVastaus] = useState({
        kysymysid: props.kysymys.kysymysid,
        vastauksensisalto: ''
    });
    
    const handleInputChange = (e) => {
        // tallenna tieto
        setVastaus({...vastaus, [e.target.name]: e.target.value});
    }

    const tallennaVastaus = () => {
        props.muutaVastausLista(vastaus);
    }

    return (
        <>
          
        <p>{props.kysymys.sisalto}</p>
        <TextField
            onChange={e => handleInputChange(e)}
            name="vastauksensisalto"
            value={vastaus.vastauksensisalto}
            onBlur={tallennaVastaus}
            >

        </TextField>

        </>
    );
}