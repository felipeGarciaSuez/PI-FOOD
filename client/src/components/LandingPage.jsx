import { Link } from "react-router-dom";
import style from "./styles/LandingPage.module.css"


export default function LandingPage(){

    return(
        <div className = {style.container}>
            <h1 className={style.title}>Food PI by Felipe Garcia Suez</h1>
            <Link to ="/home"><div id={style.landingButton}>Ir a HOME</div> </Link>
                
        </div>
    )
    
}