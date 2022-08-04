import './App.css';
import AddMovie from './Components/AddMovie'
import AddGame from './Components/AddGame'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";


function App() {
    library.add(faTrash, faPencil);
    return (
        <div className="App">
            <AddMovie/>
            <AddGame/>
        </div>
    );
}

export default App;