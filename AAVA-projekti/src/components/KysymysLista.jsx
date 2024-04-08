import React, { useEffect, useState } from 'react';

export default function KysymysLista() {

    const [kysymykset, setKysymykset] = useState([]);

    useEffect(() => { getKysymykset();}, []);


    const getKysymykset = () => {
        fetch('http://localhost:8080/api/kysymyses/1/kysely', { method: 'GET' })
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error('Network response was not ok.');
            })
            .then(data => {
                setKysymykset(data._embedded.kysymyses);
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <div>
                <h1>Kysymykset</h1>
                <ul>
                    {kysymykset.map((kysymys, index) => (
                        <li key={index}>
                            {kysymys.sisalto}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
