import { useState, useEffect } from "react";
import setContent from "../../utils/setContent";
import useRickandMortyService from "../../services/RickandMortyService";

import "./randomChar.scss";

const RandomChar = () => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } =
    useRickandMortyService();

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (835 - 1)) + 1;
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, status, species, location, gender } =
    data;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <div>
          <p className="randomchar__descr">Status: {status}</p>
          <p className="randomchar__descr">Species: {species}</p>
          <p className="randomchar__descr">Location: {location}</p>
          <p className="randomchar__descr">Gender: {gender}</p>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
