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
    const [kysymykset, setKysymykset] = useState([]);
    const [kysely, setKysely] = useState({
        kyselynTekija: ''
    });
    // const [vastaus, setVastaus] = useState('');


    const handleClickOpen = () => {
            setKysely({
                kyselyntekija: props.params.data.kyselynTekija.nimi
            });
            setKysymykset(props.params.data.kysymykset);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleInputChange = (e) => {
    //     setKysely({...kysely, [e.target.name]: e.target.value});
    // };

    

    return (
        <>
           <Button variant="outlined" size='small' onClick={handleClickOpen}>Avaa kysely</Button>
           <Dialog
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
                    <p>Kysleyn laatija: {kysely.kyselyntekija}</p>
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    <ul>
                        {kysymykset.map((kysymys, index) => (
                    <li key={index}>
                        {kysymys.sisalto}
                        <TextField 
                            margin="dense"
                            // name="vastaus"
                            // value={vastaus}
                            // onChange={e => handleInputChange(e)}
                            fullWidth
                            variant="outlined"
                        />
                    </li>
                    
                ))}   
                          
                    </ul>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button >Save</Button>
            </DialogActions>

            </Dialog>
        </>
    )
}