import React, { useState, useEffect } from 'react';

function Pokemon() {
  const [pokemonData, setPokemonData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [errorData, setErrorData] = useState(null);

  const handleSearch = () => {
    setLoadingData(true);
    setErrorData(null);

    fetch(`http://51.178.27.150:3001/pokemon/${searchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Mauvaise réponse du serveur');
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        setErrorData(error.message);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const [pokemonDatas, setPokemonDatas] = useState(null);
  const [loadingDatas, setLoadingDatas] = useState(false);
  const [errorDatas, setErrorDatas] = useState(null);

  useEffect(() => {
    setLoadingDatas(true);
    setErrorDatas(null);

    fetch(`http://51.178.27.150:3001/pokemons`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Mauvaise réponse du serveur');
        }
        return response.json();
      })
      .then((data) => {
        setPokemonDatas(data);
      })
      .catch((error) => {
        setErrorDatas(error.message);
      })
      .finally(() => {
        setLoadingDatas(false);
      });
  }, []); // Utilisation de useEffect pour effectuer la récupération au montage du composant uniquement
  var formattedDate = null;
  if(pokemonData){
    formattedDate = new Date(pokemonData.created).toLocaleString();
  }

  return (
    <div className="bg-gray-100">
      <input
        type="text"
        className="border-2 border-gray-300 p-2 mt-4"
        placeholder="ID du pokemon"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loadingData}
      >
        Rechercher
      </button>

      {loadingDatas && <p>Chargement des données...</p>}

      {errorDatas && <p>Erreur lors de la récupération des données des Pokémon: {errorDatas}</p>}

      {!loadingDatas && !errorDatas && pokemonDatas && !pokemonData && (
        <div className="container mx-auto mt-8 p-4 flex flex-wrap ">
          {pokemonDatas.map((pokemonData, index) => (
            <div key={index} className="flex flex-col items-center mb-4 mx-3">
              <div className="flex-shrink-0">
                <img src={pokemonData.picture} alt={pokemonData.name} width="100" height="50" />
              </div>
              <div className="mt-2"> {/* Ajout d'une marge entre l'image et le nom */}
                <h1 className="text-4xl font-bold">{pokemonData.name}</h1>
              </div>
            </div>
          ))}
        </div>
      )}

      {pokemonData && (
        <div className="container mx-auto mt-8 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src={pokemonData.picture} alt="" width="100" height="50" />
            </div>
            <div className="ml-4">
              <h1 className="text-4xl font-bold mb-4">{pokemonData.name}</h1>
              <p className="text-lg mb-4">
              <strong>{pokemonData.name}</strong> est un Pokémon de <strong>type: {pokemonData.types.join(', ')}</strong> avec un <strong>Hp = {pokemonData.hp}</strong> et un <strong>Cp = {pokemonData.cp}</strong> créé le <strong>{formattedDate}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemon;