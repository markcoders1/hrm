import { useOutletContext } from "react-router-dom"
import { LoggedCards } from "./LoggedCards"


const Devices=()=>{
const setHeadertext = useOutletContext();
setHeadertext("Your Devices")

    return <div 
    style={{
        width:"100%",
        backgroundColor:"white",
        padding:"30px 20px",
        boxShadow:"1px 1px 20px gray",
        borderRadius:"5px",
        display:"flex",
        gap:"2rem",

    }}
    >
        <LoggedCards/>
        <LoggedCards/>
        

    </div>
}

export default Devices