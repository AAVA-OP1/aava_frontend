import { useState } from "react"
import { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Kysely from "./Kysely";
import KyselynRaportti from "./KyselynRaportti";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Home() {

    const [kyselyt, setKyselyt] = useState([]);
    const [colDefs, setColDefs] = useState([
        {field: 'nimi', sortable: true, filter: true, floatingFilter: true},
        {field: 'kyselynTekija.nimi', filter: true, floatingFilter: true},
        // cellrenderer lähettää kyselyn (rivin) tiedot parametrinä Kysely.jsx
        {cellRenderer: (params) => 
            <Kysely params={params}/>,
            width: 170},
        {cellRenderer: (params) => 
            <KyselynRaportti params={params}/>,
            width: 350}
    ]);

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
            setKyselyt(respData);
        })
        .catch(err => console.error(err))
    };

    return(
        <>
            <h1>
                
            </h1>            
            {/* Tähän listaus aktiivisista kyselyistä */}
            <h2>Aktiiviset kyselyt</h2>
            <div className="ag-theme-material" style={{width: 1800, height: 500}}>
                <AgGridReact
                    rowData={kyselyt}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                >     
                </AgGridReact>
            </div>
        </>
    )
}