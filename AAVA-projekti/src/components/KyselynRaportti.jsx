import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";

export default function KyselynRaportti(props) {
  const [open, setOpen] = useState(false);

  const [kysely, setKysely] = useState([]);
  const [kysymykset, setKysymykset] = useState([]);
  const [tekija, setTekija] = useState('');

  const handleClick = () => {
    setTekija(props.params.data.kyselynTekija.nimi);
    setKysely(props.params.data);
    setKysymykset(props.params.data.kysymykset);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        Tarkastele vastauksia
      </Button>
      <Dialog
        // avaa dialogi-ikkunan
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Kyselyraportti kyselylle: {kysely.nimi}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Kyselyn tekijä : {tekija}
          </DialogContentText>{" "}
          <DialogContentText>Kyselyn nimi : {kysely.nimi}</DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <div>
              {kysymykset.map((k, i) => (
                <div key={i}>
                  <p>{k.sisalto}</p>
                  {k.vastaukset.map((v, j) => (
                    <div key={j}>
                      <ul>
                        <li>{v.vastaus}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Sulje</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
