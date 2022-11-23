import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Bar from "./Components/Charts/Bar.jsx";
import Line from "./Components/Charts/Line.jsx";
import Home from "./Components/Home";
import User from "./Components/User";
import Produc from "./Components/Produc";
import Role from "./Components/Role";
import Category from "./Components/Category";
import Pie from "./Components/Charts/Pie.jsx";
import Producdetail from "./Components/Produc/Producdetail.jsx";
import Productupdate from "./Components/Produc/Productupdate";
import Produchome from "./Components/Produc/Produchome";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Admin />}>
          <Route index element={<Home />} />
          <Route path="/user" element={<User />}></Route>
          <Route path="/bar" element={<Bar />}></Route>
          <Route path="/pie" element={<Pie />}></Route>
          <Route path="/role" element={<Role />}></Route>
          <Route path="/line" element={<Line />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/produc" element={<Produc />} >

          <Route index element={<Produchome/>} ></Route>
            <Route  path='/produc/Producdetail' element={<Producdetail/>}></Route>
            <Route  path='/produc/Productupdate' element={<Productupdate/>}></Route>
          </Route>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
