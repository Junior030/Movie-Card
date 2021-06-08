import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();
    this.fetchMovie = this.fetchMovies.bind(this);
    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  async fetchMovies() {
    const movies = await movieAPI.getMovies();
    this.setState({
      movies,
      loading: false,
    });
  }

  render() {
    const { movies, loading } = this.state;
    // Render Loading here if the request is still happening
    if (loading) return <Loading />;
    return (
      <div data-testid="movie-list">
        <header className="addCardHeader">
          <h1>MovieCard</h1>
          <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        </header>
        <main className="movie-list">
          { movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        </main>
      </div>
    );
  }
}

export default MovieList;
