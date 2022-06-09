import { useHttp } from "../hooks/http.hook";

const useRickandMortyService = () => {
  const { request, clearError, process, setProcess } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=b392e6dc73e1b9bea7c19d113a55c218";
  const _baseOffset = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  const getAllCharacters = async (offset) => {
    let newOffsetArray = [];

    if (offset !== 18) {
      for (let i = 0; i > -18; i--) {
        newOffsetArray.push(offset - i);
      }
    }

    const res = await request(
      `https://rickandmortyapi.com/api/character/${
        offset !== 18 ? newOffsetArray : _baseOffset
      }`
    );
    return res.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    return _transformCharacter(res);
  };

  const getCharacterByName = async (name) => {
    const res = await request(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );
    return res.results.map(_transformCharacter);
  };

  const _transformCharacter = (char) => {
    let time = char.created.slice(0, 10);
    return {
      id: char.id,
      name: char.name,
      gender: char.gender,
      episodes: char.episode.map((item) => item.replace(/[^0-9]+/g, "")),
      thumbnail: char.image,
      location: char.location?.name,
      homepage: char.url,
      status: char.status,
      species: char.species,
      created: time,
      liked: false,
    };
  };

  return {
    process,
    getAllCharacters,
    getCharacter,
    clearError,
    getCharacterByName,
    setProcess,
  };
};

export default useRickandMortyService;
