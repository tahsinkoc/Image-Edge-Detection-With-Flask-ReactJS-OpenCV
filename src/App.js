import './App.css';
import { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import {
  Container
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Images from './components/Images';

function App() {
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setApiCheck(data));
  }, []);
  const [apiCheck, setApiCheck] = useState([]);
  return (
    <div className="App">
      <Container className='lg-12'>
      </Container>
      <Router>
        <Routes>
          <Route path="/" element={<FileUpload />}>
          </Route>
          <Route path="/images" element={<Images />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
