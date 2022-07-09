import  {Component} from "react";
import { Link } from "react-router-dom";



class NavBar extends Component{
    render(){
        return(
            <div style={{display:"flex",color:"blue",justifyContent:"space-evenly"}} className="navbar">
            <Link to="/" style={{textDecoration:"none",marginTop:'1rem'}} ><h1>Movies App</h1></Link>

            <Link to="/favourites" style={{textDecoration:"none",marginTop:'1rem'}}><h1 style={{marginLeft:"0.2rem"}}>Favourites</h1></Link>
            </div>
        )
    }
}

export default NavBar