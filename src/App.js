import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function GetDrink() {
  const [name, setName] = useState();
  const [image_url, setImgURL] = useState();
  const [description, setDescription] = useState();
  const [abv, setABV] = useState();
  const [pairing, setPairings] = useState();
  const [tips, setTips] = useState();
  const [tagline, setTagline] = useState();
  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers/random").then(results =>
      results.json().then(data => {
        setName(data[0].name);
        setDescription(data[0].description);
        setImgURL(data[0].image_url);
        setPairings(
          data[0].food_pairing.map(pairing => {
            return (
              <ul>
                <li>{pairing}</li>
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
    <div>
      <h1>Feeling Lucky, Punk?</h1>
      <h2>
        {name} ({abv}%)
      </h2>
      <h3>{tagline}</h3>
      <img src={image_url} alt={name} />
      <h4>{description}</h4>
      <p>Our brewers say: "{tips}"</p>
      <p>This beer goes well with:{pairing}</p>
    </div>
  );
}

ReactDOM.render(<GetDrink />, document.getElementById("root"));

export default GetDrink;
