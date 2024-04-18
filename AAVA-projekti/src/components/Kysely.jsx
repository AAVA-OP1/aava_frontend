import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DialogContentText from '@mui/material/DialogContentText';

export default function Kysely(props) {

    const [open, setOpen] = useState(false);
    const [kysymykset, setKysymykset] = useState([{
        sisalto: '',

        // miten vastaus tallennetaan niin, että kysymysid pysyy vastauksen tiedossa?
        vastaukset: []
    }]);

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
        setKysymykset({...kysymykset, [e.target.name]: e.target.value});
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
                    <ul>
                        {kysymykset.map((kysymys, index) => (
                    <li key={index}>
                        {kysymys.sisalto}

                        {/* tämä ei toimi enää, koska "vastaukset" on taulukko */}
                        {/* aiemmin avasti tekstikentän jokaisen kysymyksen alle */}
                        {/* hakee olemassaolevat vastaukset kun pitäisi luoda uusi vastaus */}
                        {/* <TextField 
                            margin="dense"
                            name="vastaukset"
                            value={kysymykset.vastaukset}
                            onChange={e => handleInputChange(e)}
                            fullWidth
                            variant="outlined"
                        /> */}
                    </li>
                    
                ))}   
                          
                    </ul>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>

                {/* tänne tallennustoiminta sitten kun sen aika on */}
                <Button >Save</Button>
            </DialogActions>

            </Dialog>
        </>
    )
}