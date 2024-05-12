import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import ItemList from "./Components/ItemList/ItemList";
import DetailPage from "./Components/Details/DetailPage";
import axios from "axios";


function App() {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [queries, setQueries] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

  const fetchData = () => {
    axios
      .get(
        "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
      )
      .then((response) => {
        setData(response.data);
        localStorage.setItem("universityData", JSON.stringify(response.data));
        setIsDataFetched(true);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
        const storedData = localStorage.getItem("universityData");
        if (storedData) {
          setData(JSON.parse(storedData));
          setIsDataFetched(true);
        }
      });
  };

  const handleSearch = (query) => {
    const results = data.filter((item) => {
      setQueries(query);
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
  };

  const handleClear = () => {
    setSearchResults([]);
    setQueries("");
  };

  const handleDeleteItem = (index) => {
    if (searchResults.length > 0) {
      const updatedListings = [...searchResults];
      updatedListings.splice(index, 1);
      setSearchResults(updatedListings);
    } else {
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    }
  };

  return (
    <Router>
      <div>
        <Header onSearch={handleSearch} onClear={handleClear} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ItemList
                listings={searchResults.length > 0 ? searchResults : data}
                noResultFound={searchResults.length === 0 && queries !== ""}
                onDeleteItem={handleDeleteItem}
              />
            }
          />
          <Route path="/details/:name" exact element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
