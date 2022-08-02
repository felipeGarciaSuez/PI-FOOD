import React, { useEffect, useState } from "react";
import styles from "./styles/Card.module.css"

export default function Card ({name, image, diets, id}) {
    
    const [dbDiets, setDbDiets] = useState(diets)
    
    id ? setDbDiets(id => {
        console.log("me ejecutte")
        if(id.length > 8){
            
            return dbDiets.map(d => d.name)
            
        }
    }) : 
        console.log("aaa")
    

    return (
        <div key={id} className={styles.card}>
            <h3 className = {styles.card_title}>{name}</h3>
            <h5 className = {styles.diets_info}> {dbDiets.join(", ").charAt(0).toUpperCase() + dbDiets.join(", ").slice(1)} </h5>
            <img src={image} className={styles.card_image}/>
        </div>
    )
}