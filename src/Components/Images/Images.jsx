import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Image.css";
import Skeleton from "@mui/material/Skeleton";

function Images() {
  // States to manage the component data
  const [value, setValue] = useState("");                            // For input field value
  const [results, setResults] = useState([]);                         // For storing fetched image results
  const [isLoading, setIsLoading] = useState(false);                   // For loading state
  const [page, setPage] = useState(1);                                 // For current page number
  const [totalPages, setTotalPage] = useState(0);                      // For total number of pages
  const [SearchResult, SetSearchResult] = useState("");                 // For displaying the search result text
  const [searchQuery, setSearchQuery] = useState("");                    // For storing the search query

  // Function to fetching the data from the API
  const fetchData = async (query, pageNumber) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=12cRNMgrIbgq3NVvsVDIf3jrSOUCjoyzYU1s8XF0yz0&query=${query}&per_page=12&page=${pageNumber}&orientation=squarish`
      );

      console.log(response.data);
      setResults(response.data.results);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // UseEffect to fetch data when searchQuery or page changes
  useEffect(() => {
    if (searchQuery !== "") {                  // if searchQuery is empty
      fetchData(searchQuery, page);             //
    }
  }, [searchQuery, page]);


  // Function for handling search button clicking
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(value);                         // Setting the search query
    setPage(1); // Resetting the page to 1 when a new search is made
    SetSearchResult(value);                       // Setting the search result text
    setValue("");                                 // And Resetting the input field
  };


  // Function to handle category selection
  const handleSelection = (category) => {
    setSearchQuery(category); // Using the category as A search query 
    setPage(1); // Resetting the page to 1 when a new category is selected
    SetSearchResult('');        // Resetting the search result text Because of Category change
  };

  return (
    <div>
      {/* Logo */}
      <div>
        <img
          src="https://static.wixstatic.com/media/a10910_8be39bd3058f42fbb55fa3caad6f2b49~mv2.png/v1/fill/w_179,h_74,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/a10910_8be39bd3058f42fbb55fa3caad6f2b49~mv2.png"
          alt=""
        />
      </div>

      {/* Search bar Added */}

      <div className="search_input_form_containers">
        <input
          placeholder="Search Anything..."
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="search_button" onClick={handleSearch}>
          Search
        </button>

        {/* Category buttons Added */}

        <div className="btn_container">
          <button
            className="Category_button"
            onClick={() => handleSelection("Mountain")}
          >
            Mountain
          </button>
          <button
            className="Category_button"
            onClick={() => handleSelection("Flowers")}
          >
            Flowers
          </button>
          <button
            className="Category_button"
            onClick={() => handleSelection("Beaches")}
          >
            Beaches
          </button>
          <button
            className="Category_button"
            onClick={() => handleSelection("Cities")}
          >
            Cities
          </button>
        </div>
      </div>

      {/* Skeleton loader */}

      {isLoading ? (
        <div className="skeleton">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={280}
              height={250}
            />
          ))}
        </div>
      ) : (

        // Images gallery

        <>
          <h2>{SearchResult || " "}</h2>
          <br />
          <div className="gallery_containers">
            {results.map((item) => (
              <div className="image-container">
                <img
                  className="Img_items"
                  key={item.id}
                  src={item.urls.regular}
                  alt={item.alt_description}
                />
                {item.alt_description && (
                  <div className="tooltip">{item.alt_description}</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {/* Pagination */}
      <div>
        {page > 1 && (
          <button className="Category_button" onClick={() => setPage(page - 1)}>
            Previous
          </button>
        )}
        {page < totalPages && (                      // if page is less than total pages then Increamenting the page
          <button className="Category_button" onClick={() => setPage(page + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Images;
