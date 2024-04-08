import React, { useEffect, useState } from 'react';

export default function KysymysLista() {

    // useState kysymykset, voisi nimetä vielä jokaisen kentän erikseen.
    const [kysymykset, setKysymykset] = useState([]);

    // Hakee Fetch tiedot ensimmäisellä käynnistys kerralla
    useEffect(() => { getKysymykset(); }, []);


    // Tämä hakee REST kyselyllä localhost kyselyt, muuta URL jos tarvitsee
    const getKysymykset = () => {
        fetch('http://localhost:8080/kyselyt', { method: 'GET' })
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error('Network response was not ok.');
            })
            .then(data => {
                // TÄLLÄ HETKELLÄ OTTAA EKAN KYSELYN KYSYMYKSET
                if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].kysymykset)) {
                    setKysymykset(data[0].kysymykset);
                }
            })
            .catch(err => console.error(err));
    };


return (
    <>
        <div>
            <h1>Kysymykset</h1>
            <ul>
                {/* Tämä käy läpi kysymykset ja printtaa niiden .sisältö */}
                {kysymykset.map((kysymys, index) => (
                    <li key={index}>
                       Sisältö: {kysymys.sisalto} ### KysymysID: {kysymys.kysymysid}
                    </li>
                ))}
            </ul>
        </div>
    </>
);
}
