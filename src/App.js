import './App.css';
import './components/navbar/Navbar'
//import Navbar from './components/navbar/Navbar';
//import Navbar from 'react-bootstrap/Navbar'
import Navigation from './components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Navigation sticky="top" />

      <header className="App-header">

        <p>
          This is the base code for our Messenger App.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Now
        </a>
      </header>
    </div>
  );
}

export default App;
