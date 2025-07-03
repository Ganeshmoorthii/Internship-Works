import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import CardPage from "./components/CardPage";
import Card from "@mui/material/Card";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  // const [user,setUser] = useState({});
  // useEffect(() =>{
  //   axios D:\Projects\Sample Project\sample-project2\components\Header
  //   .get("https://jsonplaceholder.typicode.com/users/1")
  //   .then((response)=>{
  //     setUser(response.data);
  //   })
  //   .catch((error)=>{
  //     console.error("Error fetching user data:", error);
  //   });
  // },[])
  const CardList = [
    {
      id: 1,
      title: "Lizard",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      image:
        "https://cdn.pixabay.com/photo/2017/06/21/13/37/lizard-2427248_1280.jpg",
    },
    {
      id: 2,
      title: "Snake",
      description:
        "Snakes are long-legged, skinny, elongated reptiles with a variety of shapes and sizes, some of which are venomous.",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.UElf2e43mn7bGLaeMIfrMAHaFC?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      title: "Turtle",
      description:
        "Turtles are reptiles with a hard, protective shell and a long neck. They are a diverse group of reptiles, with over 1,500 species, ranging across all continents except Antarctica.",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.4sigoyMvJvUt4Mk6ptbsHAHaFQ?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 4,
      title: "Frog",
      description:
        "Frogs are amphibians with a smooth, moist skin and long legs. They are a diverse group of amphibians, with over 7,000 species, ranging across all continents except Antarctica.",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.mKd84EyT-rlBJ-jJhNyi9QHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 5,
      title: "Crocodile",
      description:
        "Crocodiles are large, carnivorous reptiles with a long snout and powerful jaws. They are a diverse group of reptiles, with over 15 species, ranging across all continents except Antarctica.",
      image:
        "https://tse3.mm.bing.net/th/id/OIP._KznwsjY6M8AP5lJBmK9bQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
      {/* <div className="body-section">
        <div className="card-container">
          {CardList.map((card) => (
            <CardPage key={card.id} card={card} />
          ))}
        </div>
      </div> */}
    </>
  );
}

export default App;
