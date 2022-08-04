import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const AddGame = ({ onAdd }) => {
  const [game_name, setName] = useState("");
  const [game_genre, setGenre] = useState("");
  const [game_release_year, setReleaseYear] = useState("");
  const [game_collection, setCollection] = useState("");
  const [game_system, setGameSystem] = useState("");
  const [gameId, setgameId] = useState(null);
  const [games, setgames] = useState([]);

  useEffect(() => {
    refreshGames();
  }, []);

  const gameAPI =  axios.create({
    baseURL: "http://127.0.0.1:8000/backend_api/games",
    headers: {'Accept':'application/json', 'Content-Type':'application/json',}
  });

  const refreshGames = () => {
    gameAPI.get("/")
      .then((res) => {
        setgames(res.data);
        // setName(res[0].name)
        // setGenre(res[0].genre)
        // setStarring(res[0].starring)
        // setgameId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { game_name, game_genre, game_release_year, game_collection, game_system };
    gameAPI.post("/", item).then(() => refreshGames());
  };

  const onUpdate = (id) => {
    let item = { game_name };
    gameAPI.patch(`/${id}/`, item).then((res) => refreshGames());
  };

  const onDelete = (id) => {
    gameAPI.delete(`/${id}/`).then((res) => refreshGames());
  };

  function selectGame(id) {
    let item = games.filter((game) => game.id === id)[0];
    setName(item.game_name);
    setGenre(item.game_genre);
    setReleaseYear(item.game_release_year);
    setCollection(item.game_collection);
    setGameSystem(item.game_system);
    setgameId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Add a Game</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{gameId}Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={game_name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Genre"
                value={game_genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicReleaseYear">
              <Form.Label>Release Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Release Year"
                value={game_release_year}
                onChange={(e) => setReleaseYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCollection">
              <Form.Label>Collection</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Collection"
                value={game_collection}
                onChange={(e) => setCollection(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSystem">
              <Form.Label>System</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter System"
                value={game_system}
                onChange={(e) => setGameSystem(e.target.value)}
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
                onClick={() => onUpdate(gameId)}
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
                <th scope="col">Game Name</th>
                <th scope="col">Genre</th>
                <th scope="col">Release Year</th>
                <th scope="col">Collection</th>
                <th scope="col">System</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => {
                return (
                  <tr key="">
                    <th scope="row">{game.id}</th>
                    <td> {game.game_name}</td>
                    <td>{game.game_genre}</td>
                    <td>{game.game_release_year}</td>
                    <td>{game.game_collection}</td>
                    <td>{game.game_system}</td>
                    <td>
                      <FontAwesomeIcon icon="pencil" 
                        aria-hidden="true"
                        onClick={() => selectGame(game.id)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon icon="trash" 
                        aria-hidden="true"
                        onClick={() => onDelete(game.id)}
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

export default AddGame;