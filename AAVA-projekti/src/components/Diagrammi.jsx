import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle } from 'recharts';
import { useEffect, useState } from "react";
import * as React from 'react';

export default function Diagrammi() {

    const URL = 'http://localhost:8080/kyselyt';
    const URLRender = 'http://localhost:8080/kyselyt';

    const [vastaukset, setVastaukset] = useState([]);
    const [kyselyt, setKyselyt] = useState([]);


    // hae treenit ekalla renderillä
    useEffect(() => {
        getKyselyt();
    }, []);

    // fetchaa treenit
    const getKyselyt = () => {
        fetch(URL)
            .then(response => response.json())
            .then(responseData => {
                setKyselyt(responseData);
                //console.log(responseData);
                calculateData(responseData);
            })
            .catch(error => console.error(error));
    }

    const testidata = [
        {
            nimi: 'Ensimmäinen testikysely',
            vastausLKM: 24,
        },
        {
            nimi: 'Kysely kouluruuasta',
            vastausLKM: 13,
        },
    ];


    const calculateData = (kyselyt) => {
        const dataMap = new Map([]);

        kyselyt.map(kysely => {
            const nimi = kysely.nimi;
            var LKM = 0;

            kysely.kysymykset.map(kysymys => {
                kysymys.vastaukset.map(vastaus => {
                    LKM++;
                })
            })

            dataMap.set(nimi, LKM);


        });
        //console.log("haha" + dataMap)

        var rightList = [];
        dataMap.forEach((LKM, nimi) => {
            rightList.push({ nimi, LKM });
            //console.log(rightList);
        });
        
                // muutetaan ne chartin vaatiman muotoon
                const transformedData = [];
        
                dataMap.forEach((vastausLKM, nimi) => {
                    transformedData.push({
                        nimi,
                        vastausLKM
                    });
                });
        
                //console.log(transformedData);
                return transformedData;
                
    }

    //
     const rightDataList = calculateData(kyselyt);

    return (
        <div style={{ width: '100%', height: 1000 }}>
            <ResponsiveContainer style={{ width: '60%', height: 800 }}>
                <BarChart
                    data={rightDataList}
                    margin={{
                        top: 50,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 5" />
                    <XAxis dataKey="nimi" />
                    <YAxis label={{ value: 'Lukumäärä', position: 'top' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="vastausLKM" fill="#f6b26b" activeBar={<Rectangle fill="#3575db" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}
