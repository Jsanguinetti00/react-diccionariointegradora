import React from "react";
import '../components/styles/Card.css'

const CardInfo = ({ word, phonetics, meanings }) => {
    return (
        <>
            <div className="cardInfo">
                <h4>Word: {word} </h4>
                <div>Meanings:
                    <ul style={{listStyle: 'none'}}>
                        {
                            meanings.map( (item, index )=> {
                                return(
                                <li key={index}>
                                    <div style={{marginBottom: '10px'}}> <span className="badge bg-primary"> Definition: </span> { item.definition } </div>
                                    <div> <span className="badge bg-secondary"> Ejemplo: </span> { item.example } </div>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <p>Phonetics</p>
                <p>/həˈloʊ/</p>
            </div>
        </>
    )
}

export default CardInfo;