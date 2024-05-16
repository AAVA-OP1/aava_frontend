import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import Kysymys from "./Kysymys";

export default function Kysely(props) {
  const [open, setOpen] = useState(false);
  const [kysymykset, setKysymykset] = useState([]);

  const [vastaukset, setVastaukset] = useState([]);

  const [kysely, setKysely] = useState({
    kyselynTekija: "",
    nimi: "",
  });

  const handleClickOpen = () => {
    setKysely({
      // tallentaa kyselyn tekijän nimen
      kyselyntekija: props.params.data.kyselynTekija.nimi,
      nimi: props.params.data.nimi,
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
  };

  const muutaVastausLista = (vastaus) => {
    console.log(vastaus);
    setVastaukset([...vastaukset, vastaus]);
  };

  const lahetaVastaukset = (v) => {
    console.log(v);
    fetch("http://aavabackend-aavaohjelmistoprojekti.rahtiapp.fi/uusivastaus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(v),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("ok");
          return response.json;
        } else {
          console.log("ei ok");
        }
      })
      .then((data) => {
        props.haeKyselyt();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  // toistaiseksi pitäisi avata kysely dialogi-ikkunassa
  return (
    <>
      <Button variant="outlined" size="small" onClick={handleClickOpen}>
        Vastaa kyselyyn
      </Button>
      <Dialog
        // avaa dialogi-ikkunan
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Vastaa kyselyyn {kysely.nimi}</DialogTitle>{" "}
        {/* nimi ei toimi.. */}
        <DialogContent>
          <DialogContentText>
            Kyselyn laatija: {kysely.kyselyntekija}
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            <div>
              {kysymykset.map((kysymys, index) => (
                <Kysymys
                  key={kysymys.kysymysid}
                  kysymys={kysymys}
                  muutaVastausLista={muutaVastausLista}
                  index={index}
                />
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Cancel</Button>

          <Button
            onClick={() => {
              lahetaVastaukset(vastaukset);
            }}
          variant="contained"
          color='success'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
