import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const AddMovie = ({ onAdd }) => {
  const [movie_name, setName] = useState("");
  const [movie_genre, setGenre] = useState("");
  const [movie_release_year, setReleaseYear] = useState("");
  const [movie_collection, setCollection] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    refreshMovies();
  }, []);

  const movieAPI =  axios.create({
    baseURL: "http://127.0.0.1:8000/backend_api/movies",
    headers: {'Accept':'application/json', 'Content-Type':'application/json',}
  });

  const refreshMovies = () => {
    movieAPI.get("/")
      .then((res) => {
        setMovies(res.data);
        // setName(res[0].name)
        // setGenre(res[0].genre)
        // setStarring(res[0].starring)
        // setMovieId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { movie_name, movie_genre, movie_release_year, movie_collection };
    movieAPI.post("/", item).then(() => refreshMovies());
  };

  const onUpdate = (id) => {
    let item = { movie_name };
    movieAPI.patch(`/${id}/`, item).then((res) => refreshMovies());
  };

  const onDelete = (id) => {
    movieAPI.delete(`/${id}/`).then((res) => refreshMovies());
  };

  function selectMovie(id) {
    let item = movies.filter((movie) => movie.id === id)[0];
    setName(item.movie_name);
    setGenre(item.movie_genre);
    setReleaseYear(item.movie_release_year);
    setCollection(item.movie_collection);
    setMovieId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Add a Movie</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{movieId}Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={movie_name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Genre"
                value={movie_genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicReleaseYear">
              <Form.Label>Release Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Release Year"
                value={movie_release_year}
                onChange={(e) => setReleaseYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCollection">
              <Form.Label>Collection</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Collection"
                value={movie_collection}
                onChange={(e) => setCollection(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(movieId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Movie Name</th>
                <th scope="col">Genre</th>
                <th scope="col">Release Year</th>
                <th scope="col">Collection</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => {
                return (
                  <tr key="">
                    <th scope="row">{movie.id}</th>
                    <td> {movie.movie_name}</td>
                    <td>{movie.movie_genre}</td>
                    <td>{movie.movie_release_year}</td>
                    <td>{movie.movie_collection}</td>
                    <td>
                      <FontAwesomeIcon icon="pencil" 
                        aria-hidden="true"
                        onClick={() => selectMovie(movie.id)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon icon="trash" 
                        aria-hidden="true"
                        onClick={() => onDelete(movie.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;