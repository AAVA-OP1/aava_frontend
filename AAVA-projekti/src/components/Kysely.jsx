import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import Kysymys from './Kysymys';


export default function Kysely(props) {

    const [open, setOpen] = useState(false);
    const [kysymykset, setKysymykset] = useState([{
        sisalto: ''
    }]);

    const [vastaukset, setVastaukset] = useState([]);

    const [kysely, setKysely] = useState({
        kyselynTekija: ''
    });


    const handleClickOpen = () => {
            setKysely({
                // tallentaa kyselyn tekijän nimen
                kyselyntekija: props.params.data.kyselynTekija.nimi
            });

            // tallentaa kyselyn kysymykset
            setKysymykset(props.params.data.kysymykset);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        // setKysymykset({...kysymykset, [e.target.name]: e.target.value});
    };

    const muutaVastausLista = (vastaus) => {
        console.log(vastaus);
        setVastaukset([...vastaukset, vastaus]);
    }

    const lahetaVastaukset = (v) => {

        fetch('https://localhost:8080/uusivastaus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(v)
        })
        .then(response => {
            if (response.ok) {
                console.log("ok");
                return response.json;
            } else {
                console.log("ei ok");
            }
        })
        .then(data => {
            console.log("JSON: "  + data);
        })
        .catch(err => console.error(err))
    };



    // toistaiseksi pitäisi avata kysely dialogi-ikkunassa
    return (
        <>
           <Button variant="outlined" size='small' onClick={handleClickOpen}>Avaa kysely</Button>
           <Dialog
                // avaa dialogi-ikkunan
                open={open}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                    },
                }}
            >
            <DialogTitle>Kyselyn tiedot</DialogTitle>

            <DialogContent>
            <DialogContentText>
                    Kysleyn laatija: {kysely.kyselyntekija}

                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    <div>
                        {kysymykset.map((kysymys, index) => {
                            return(
                                <Kysymys key={kysymys.kysymysid} kysymys={kysymys} muutaVastausLista={muutaVastausLista} index={index} />
                            )
                        })}
                    </div>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>

                {/* tänne tallennustoiminta sitten kun sen aika on */}
                <Button onClick={() => {lahetaVastaukset(vastaukset)}}>Save</Button>
            </DialogActions>

            </Dialog>
        </>
    )
}