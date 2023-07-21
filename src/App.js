import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=12cRNMgrIbgq3NVvsVDIf3jrSOUCjoyzYU1s8XF0yz0&query=${value}&per_page=8&page=1&orientation=landscape`
      );

      console.log(response.data.results);
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      //shows error message.
    }
  };

  return (
    <div className="App">
      <h1>RiseUpp LOgo</h1>
      <div className="mydiv">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
        <div className="btn_container">
        <button>Mountain</button>
        <button>Flowers</button>
        <button>Beaches</button>
        <button>Cities</button>
        </div>
      
      </div>
      <div className="gallery">
        {results.map((item) => (
          <>
          <img
            className="Img_items"
            key={item.id}
            src={item.urls.regular}
            alt={item.alt_description}
          />
         
          
          </>
        ))}
      </div>
     
    </div>
  );
}

export default App;
