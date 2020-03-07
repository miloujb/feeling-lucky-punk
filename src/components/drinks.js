import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function GetDrink() {
  const [name, setName] = useState;
  const [volumeValue, setVolumeValue] = useState;
  const [volumeUnit, setVolumeUnit] = useState;
  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers/random").then(results =>
      results.json().then(data => {
        setName(data[0].name);
        const { volume } = data[0];
        setVolumeValue = volume.value;
        setVolumeUnit = volume.unit;
      })
    );
  }, []);
  return (
    <div>
      {name}: {volumeValue} {volumeUnit}
    </div>
  );
}

ReactDOM.render(<GetDrink />, document.getElementById("root"));

export default GetDrink;
