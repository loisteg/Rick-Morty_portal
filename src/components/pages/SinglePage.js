import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useRickandMortyService from "../../services/RickandMortyService";
import setContent from "../../utils/setContent";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { getCharacter, clearError, process, setProcess } =
    useRickandMortyService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "character":
        getCharacter(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
