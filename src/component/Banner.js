import axios from "axios";
import {Component} from "react"



class Banner extends Component{

    constructor(){
        super();
        this.state = {
            movie:""
        }
    }

    async componentDidMount(){

        let res = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=11b4db041bf33bf9932e58398b21c951');
        console.log(res);
        this.setState({
            movie:res.data.results[Math.floor(Math.random()*10)]
        })
    }
    render() {

        let backdrop_path = this.state.movie.backdrop_path;
        // let movie = movies.results[Math.floor(Math.random() * 10) ];;

        // let backdrop_path=movie.backdrop_path;
        console.log(backdrop_path);
        return (

            <div className="card banner-card">
                <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} className="card-img-top banner-img" alt="..."/>
                <h1 className="card-title banner-title">{this.state.movie.title}</h1>
                <p className="card-text banner-text">{this.state.movie.overview}</p>
                    
            </div>
        )
    }
}

export default Banner