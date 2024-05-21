import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Layout />}></Route>
          <Route path="/blogs" exact element={<Blogs />}></Route>
          <Route path="/contact" exact element={<Contact />}></Route>
        </Routes>
      </HashRouter>
      
    </>
  );
}
export default App;
