import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./singleCharacterLayout.scss";

const SingleCharacterLayout = ({ data }) => {
  const {
    name,
    status,
    thumbnail,
    gender,
    episodes,
    location,
    species,
    created,
  } = data;

  return (
    <>
      <Helmet>
        <meta name="description" content={`Information about the ${name}`} />
        <title>{name} Page</title>
      </Helmet>

      <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-comic__char-img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">Gender: {gender}</p>
          <p className="single-comic__descr">
            Episodes:
            {episodes.map((item) => item + ", ").slice(0, -1)}
            {episodes.at(-1)}
          </p>
          <p className="single-comic__descr">Location: {location}</p>
          <p className="single-comic__descr">Status: {status}</p>
          <p className="single-comic__descr">Created: {created}</p>
          <p className="single-comic__descr">Species: {species}</p>
        </div>
        <Link to="/" className="single-comic__back">
          Back to all
        </Link>
      </div>
    </>
  );
};

export default SingleCharacterLayout;
