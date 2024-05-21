import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <BrowserRouter>
        <Routes>
          <Route path="/dynamic-sidebar" exact element={<Layout />}></Route>
          <Route path="/dynamic-sidebar/blogs" exact element={<Blogs />}></Route>
          <Route path="/dynamic-sidebar/contact" exact element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}
export default App;
