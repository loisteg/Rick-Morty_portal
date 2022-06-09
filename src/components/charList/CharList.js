import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useRickandMortyService from "../../services/RickandMortyService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [offset, setOffset] = useState(18);
  const [charEnded, setCharEnded] = useState(false);
  const [checked, setChecked] = useState(false);

  const { getAllCharacters, process, setProcess } = useRickandMortyService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const likeChar = (id) => {
    setCharList(
      charList.map((char) => {
        if (char.id === id) char.liked = !char.liked;
        return char;
      })
    );
  };

  const onRequest = (offset, initial) => {
    initial ? setnewItemLoading(false) : setnewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharListLoaded = async (newCharList) => {
    let ended = false;
    if (newCharList.length < 18) {
      ended = true;
    }
    setCharList([...charList, ...newCharList]);
    setnewItemLoading(false);
    setOffset(offset + 18);
    setCharEnded(ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }
          }}
        >
          <Link to={`/characters/${item.id}`}>
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          </Link>
          <div className="char__name">{item.name}</div>
          <div className="char__status">
            Status: {item.status.toLowerCase()}
          </div>
          <button
            className={item.liked ? "char__like active" : "char__like"}
            onClick={() => likeChar(item.id)}
          >
            Like!
          </button>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const checkedList = () => {
    return checked
      ? () => renderItems(charList.filter((char) => char.liked))
      : () => renderItems(charList);
  };

  const elements = useMemo(() => {
    return setContent(process, checkedList(), newItemLoading);
  }, [process, charList, checked]);

  return (
    <div className="char__list">
      <div className="char__filter">
        <input
          type="checkbox"
          onChange={() => setChecked((checked) => !checked)}
        />{" "}
        <p>Show only liked heroes</p>
      </div>

      {elements}
      <button
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
