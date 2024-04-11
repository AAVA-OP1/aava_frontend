import { useState } from "react"
import KyselyLista from "./KyselyLista"
import { useEffect } from "react";

export default function Home() {

    const [kyselyt, setKyselyt] = useState([]);

    useEffect(() => haeKyselyt(), []);

    const haeKyselyt = () => {
        // hae kyselyt backendistä
        fetch('http://localhost:8080/kyselyt', {method: 'GET'}) 
        .then(response => {
            if (!response.ok) {
                console.log("Virhe");
            } else {
            return response.json();
            }
        })
        .then(respData => {
            // console.log(respData);
            setKyselyt(respData);
            console.log(kyselyt);
        })
        .catch(err => console.error(err))
    };

    return(
        <>
            <h1>
                Tervetuloa etusivulle!
            </h1>            
            {/* Tähän listaus aktiivisista kyselyistä */}
            <h2>Aktiiviset kyselyt</h2>

        </>
    )
}