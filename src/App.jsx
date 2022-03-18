import logo from './logo.svg';
import './App.css';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="App">
      <div><h1>TO-DO-LIST (RBN) </h1></div>
      <TodoList/>
    </div>
  );
}

export default App;
