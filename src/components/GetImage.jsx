import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Corrected import path

const GetImage = () => {
  const [photo, setPhoto] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  const searchImages = () => {
    if (!photo.trim()) return; // Prevent empty searches
    setError("");
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=jDCHhDy6bnOhc6p0PbL8a2fCkKWQ6mLW3HdtMF_t-eI&per_page=20`
      )
      .then((response) => {
        if (response.data.results.length === 0) {
          setError("Oops! No images found. Try searching something else.");
        }
        setResult(response.data.results);
      })
      .catch((error) => {
        setError("Oops! Something went wrong. Please try again.");
        console.error("Error fetching images:", error);
      });
  };

  return (
    <div className="container text-center py-5">
      <h1 className="mb-4 text-black">Image Search App</h1>
      <div className="input-group mb-4 w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search images..."
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <button onClick={searchImages} className="btn btn-dark">
          Search
        </button>
      </div>

      {error && <p className="text-danger fw-bold">{error}</p>}

      {/* Displaying Images */}
      <div className="row g-4 justify-content-center">
        {result.map((img) => (
          <div className="col-md-3 col-sm-6" key={img.id}>
            <div className="card shadow-lg border-0">
              <img
                src={img.urls.regular}
                alt={img.alt_description}
                className="card-img-top"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetImage;
