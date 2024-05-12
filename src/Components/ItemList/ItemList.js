import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ItemList.css";

const ItemList = ({ listings, noResultFound, onDeleteItem }) => {
  const [filteredListings, setFilteredListings] = useState([]);

  const handleFilterByCountry = (country) => {
    if (country === "") {
      setFilteredListings(listings);
    } else {
      const filteredItems = listings.filter((item) => item.country === country);
      setFilteredListings(filteredItems);
    }
  };

  useEffect(() => {
    setFilteredListings(listings);
  }, [listings]);
  return (
    <div>
      {noResultFound ? (
        <div className="item-list">
          <h2>No results found!</h2>
        </div>
      ) : (
        <div className="item-list">
          <div className="controls">
            <label>Filter by Country:</label>
            <select onChange={(e) => handleFilterByCountry(e.target.value)}>
              <option value="">All</option>
              {[...new Set(listings.map((item) => item.country))].map(
                (country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                )
              )}
            </select>
          </div>

          {filteredListings.map((item, index) => (
            <div key={index} className="item-card">
              <h2>
                <Link to={`/details/${encodeURIComponent(item.name)}`}>
                  {item.name}
                </Link>
              </h2>
              <p>
                <strong>Country:</strong> {item.country}
              </p>
              <p>
                <strong>State/Province:</strong>{" "}
                {item["state-province"] || "N/A"}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={item.web_pages[0]}>{item.web_pages[0]}</a>
              </p>
              <button className="delete-button" onClick={() => onDeleteItem(index)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
