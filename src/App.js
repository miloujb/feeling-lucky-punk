import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function GetDrink() {
  const [name, setName] = useState();
  const [image_url, setImgURL] = useState();
  const [description, setDescription] = useState();
  const [abv, setABV] = useState();
  const [pairing, setPairings] = useState();
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
      })
    );
  }, []);
  return (
    <div>
      <h1>Feeling Lucky, Punk?</h1>
      <h2>
        {name} ({abv}%)
      </h2>
      <img url={image_url} alt={name} />
      <h3>{description}</h3>
      <h4>This beer goes well with:{pairing}</h4>
    </div>
  );
}

ReactDOM.render(<GetDrink />, document.getElementById("root"));

export default GetDrink;
