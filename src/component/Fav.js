import { Component } from "react";
import { movies } from "../movieData";


class Fav extends Component {
    constructor(){
        super();
        this.state = {
            genres:[],
            currgenre:'All genres',
            movies:[],
            movies2:[],
            currText:''
        }
    }

    componentDidMount(){
        let genreIds = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"}
        let data = JSON.parse(localStorage.getItem("movies-app") || '[]'); //movies
        let tempArr = [];
        tempArr.push("All genres")
        data.map((movieObj)=>{
            if(!tempArr.includes(genreIds[movieObj.genre_ids[0]])){
                tempArr.push(genreIds[movieObj.genre_ids[0]])
            }
        })
    
        this.setState({
            movies:[...data],
            movies2:[...data],
            genres:[...tempArr]
        })
    }

    handleChangeGenre = (genre)=>{
        this.setState({
            currgenre:genre
        },this.filterMovies)
    }

    filterMovies = ()=>{
        let genreIds = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"}
        let data = JSON.parse(localStorage.getItem("movies-app") || '[]');
        if(this.state.currgenre == "All genres"){
            this.setState({
                movies:[...data],
                movies2:[...data]
            })
        }else{
            let filteredMovies = data.filter((movieObj)=>genreIds[movieObj.genre_ids[0]] == this.state.currgenre)
            this.setState({
                movies:[...filteredMovies],
                movies2:[...filteredMovies]
            })
        }
    }

    handleCurrText = (inputValue)=>{
        console.log(inputValue)
        this.setState({
            currText:inputValue
        },this.searchMovies)
    }

    searchMovies = ()=>{
        if(this.state.currText != ''){
            let filteredArr = this.state.movies2.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            })
            this.setState({
                movies:[...filteredArr]

            })
        }else{
            this.setState({
                movies:[...this.state.movies2]
            })
        }
    }

    sortpopulairtydesc = ()=>{
        let temp=this.state.movies.map((movieObj)=>movieObj);

        temp.sort(function(obja,objb){
            return objb.popularity-obja.popularity;
        })

        this.setState({
            movies:[...temp],
            movies2:[...temp],
        })
    }

    sortpopulairtyinc = ()=>{
        let temp=this.state.movies.map((movieObj)=>movieObj);

        temp.sort(function(obja,objb){
            return obja.popularity-objb.popularity;
        })

        this.setState({
            movies:[...temp],
            movies2:[...temp],
        })
    }

    sortRatinginc = ()=>{
        let temp=this.state.movies.map((movieObj)=>movieObj);

        temp.sort(function(obja,objb){
            return obja.vote_average-objb.vote_average;
        })

        this.setState({
            movies:[...temp],
            movies2:[...temp],
        })
    }

    sortRatingdesc = ()=>{
        let temp=this.state.movies.map((movieObj)=>movieObj);

        temp.sort(function(obja,objb){
            return objb.vote_average-obja.vote_average;
        })

        this.setState({
            movies:[...temp],
            movies2:[...temp],
        })
    }
    handleDelete = (movieEle) =>{
        let filteredArr = this.state.movies.filter((movieObj)=>{
            if(movieObj!=movieEle){
                return true;
            }
        })

        this.setState({
            movies:[...filteredArr],
            movies2:[...filteredArr]
        })
    }
    render() {
        let genreIds = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"}
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <ul className="list-group genre-selector">
                            {
                                this.state.genres.map((genre)=>(
                                    this.state.currgenre == genre ?(
                                        <li className="list-group-item active" >{genre}</li>
                                    ):
                                    (<li className="list-group-item" onClick={()=>this.handleChangeGenre(genre)}>{genre}</li>)
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-9 fav-table">
                        <div className="row">
                            <input type="text" className="form-control col" placeholder="Search" value={this.state.currText} onChange={(e)=>this.handleCurrText(e.target.value)}/>
                            <input type="number" className="form-control col" />
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col" style={{marginLeft:"-1rem",display:"flex",justifyContent: "space-between",marginRight: "0.3rem",alignItems:"center"}}>
                                        <i class="fa fa-sort-up" onClick={this.sortpopulairtydesc}></i>
                                        Popularity
                                        <i class="fa fa-sort-down"  onClick={this.sortpopulairtyinc}></i>
                                    </th>
                                    <th scope="col" style={{marginLeft:"-4rem"}}>
                                        <i class="fa fa-sort-up" onClick={this.sortRatingdesc}></i> 
                                        Rating
                                        <i class="fa fa-sort-down"  onClick={this.sortRatinginc}></i>
                                    </th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.movies.map((movieEle) => (
                                        <tr>
                                            <th scope="row"><img style={{ width: "8rem", padding: "1rem" }} src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`} />{movieEle.title}</th>
                                            <td>{genreIds[movieEle.genre_ids[0]]}</td>
                                            <td >{movieEle.popularity}</td>
                                            <td>{movieEle.vote_average}</td>
                                            <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieEle)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Fav;