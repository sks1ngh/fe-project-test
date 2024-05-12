import React, { useEffect, useState } from "react";
import "./DetailPage.css";
import { useParams } from "react-router-dom";

const DetailPage = ({ match }) => {
  const { name } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem("universityData");
    if (storedData) {
      const universityData = JSON.parse(storedData);
      const selectedItem = universityData.find(
        (item) => item.name === decodeURIComponent(name)
      );
      if (selectedItem) {
        setItemDetails(selectedItem);
      }
    }
  }, [name]);
  return (
    <div>
      {itemDetails ? (
        <div className="item-list">
          <h2>Details for: {decodeURIComponent(name)}</h2>
          <p>
            <strong>Country:</strong> {itemDetails.country}
          </p>
          <p>
            <strong>State/Province:</strong>{" "}
            {itemDetails["state-province"] || "N/A"}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={itemDetails.web_pages[0]}>{itemDetails.web_pages[0]}</a>
          </p>
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
