import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path ="/" element={<Home />}/>
        <Route path ="/store" element={<h1>Store</h1>}/>
      </Routes>
    </>
  )
}

export default App;
