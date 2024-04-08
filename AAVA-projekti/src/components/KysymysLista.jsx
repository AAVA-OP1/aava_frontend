import React, { useState, useEffect } from 'react';

export default function KysymysLista() {

    const getKysymykset = () => {


        const [kysymykset, setKysymykset] = useState([]);

        // Fetchaa kysymykset ID:llä 1 localhost, muista vaihtaa ESIM Rahti-palveluun
        fetch('http://localhost:8080/api/kyselies/1/kysymykset', { method: 'GET' })
            .then(response => {
                //console.log(response)
                if (response.ok)
                    return response.json();
            })
            .then(data => {
                //console.log(data._embedded.cars);
                setKysymykset(data._embedded.kysymyses);
            })
            .catch(err => console.error(err)
            )
    }

    // Hakee Kysymykset vain ensimmäisellä latauskerralla
    useEffect(() => {
        getKysymykset();
    }, []); 


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
)
}