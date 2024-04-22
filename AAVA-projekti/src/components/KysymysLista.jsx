import React, { useEffect, useState } from 'react';

export default function KysymysLista() {

    // useState kysymykset, voisi nimetä vielä jokaisen kentän erikseen.
    const [kyselyt, setKyselyt] = useState([]);

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
                // // TÄLLÄ HETKELLÄ OTTAA EKAN KYSELYN KYSYMYKSET
                // if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].kysymykset)) {
                //     setKysymykset(data[0].kysymykset);
                // }
                setKyselyt(data);
               
            })
            .catch(err => console.error(err));
    };


return (
    <>
        <div>
            <h1>Kysymykset ja niiden vastaukset</h1>
               {/* käydään kyselyt, niiden kysymykset ja kysymysten vastaukset läpi */}
               {/* ps. jos rikot tämän, alina murhaa sut */}
            {
                kyselyt.map((kysely) => (
                    kysely.kysymykset.map((kysymys, j) => (
                        <div key={j}>
                            <p>{kysymys.sisalto}</p>
                        {kysymys.vastaukset.map((vastaus, k) => (
                            <div key={k}>
                                {/* <p>{vastaus.vastaus}</p> */}
                                <ul>
                                    <li>{vastaus.vastaus}</li>
                                </ul>
                            </div>
                        ))}
                        </div>
                    ))
                ))
            }

        </div>
    </>
);
}
