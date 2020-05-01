import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {FaHeart} from 'react-icons/fa'
import "../src/App.css";

function GetDrink() {
  const [name, setName] = useState();
  const [image_url, setImgURL] = useState();
  const [description, setDescription] = useState();
  const [abv, setABV] = useState();
  const [pairing, setPairings] = useState();
  const [tips, setTips] = useState();
  const [tagline, setTagline] = useState();

  function reloadPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers/random").then((results) =>
      results.json().then((data) => {
        setName(data[0].name);
        setDescription(data[0].description);
        setImgURL(data[0].image_url);
        setPairings(
          data[0].food_pairing.map((pairing) => {
            return (
              <ul className="list">
                <li className="pair">{pairing}</li>
              </ul>
            );
          })
        );
        setABV(data[0].abv);
        setTips(data[0].brewers_tips);
        setTagline(data[0].tagline);
      })
    );
  }, []);
  return (
    <div className="background">
      <h1 className="title">Feeling Lucky, Punk?</h1>
      <h2 className="name">
        {name} ({abv}%)
      </h2>
      <h3 className="tagline">{tagline}</h3>
      <div className="image-container">
        <img className="image" src={image_url} alt={name} />
      </div>
      <div className="text-container">
        <h4 className="desc">{description}</h4>
        <p className="brewers">Our brewers say: "{tips}"</p>
        <p className="pairing">This beer goes well with:{pairing}</p>
        <div className="button">
          <input type="button" value="Refresh" onClick={reloadPage} />
        </div>
      </div>
     <div className="footer">
  <p>Made with <FaHeart /> by Emily Bailey, May 2020</p>
     </div>
    </div>
  );
}

ReactDOM.render(<GetDrink />, document.getElementById("root"));

export default GetDrink;
