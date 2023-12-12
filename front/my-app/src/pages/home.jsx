import React, { useState } from 'react'

function Home() {
  const [pokemonData, setPokemonData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const handleSearch = ()=>{
    fetch(`http://51.178.27.150:3001/pokemon/${searchId}`)
    .then((reponse)=>{
      if(!reponse.ok){
        throw new Error('Mauvaise réponse du serveur');
      }
      return reponse.json()
      .then((data)=>{
        setPokemonData(data);
      });
    })
  }
  return (

  <div className="bg-gray-100">
    <input type="text" className='border-2 border-gray-300 p-2 mt-4' placeholder='id du pokemon' value={searchId} onChange={(e)=>setSearchId(e.target.value)} />
    <button onClick={handleSearch} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Rechercher
    </button>
    {!pokemonData && (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img src="/pokemon-go.png" alt="" width="100" height="50" />
        </div>
        <div className="ml-4 ">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre site Pokemon!</h1>
          <p className="text-lg mb-4">
            Découvrez le monde incroyable des Pokémon. Explorez une vaste collection de créatures uniques,
            apprenez-en plus sur leurs capacités et partez à l'aventure dans un univers rempli de surprises.
          </p>
          <p className="text-lg">
            Que vous soyez un dresseur chevronné ou un novice, il y a toujours quelque chose de nouveau à découvrir.
            Préparez-vous à embarquer dans une aventure Pokémon inoubliable!
            j'adore les pokemon !!!  <a href="https://www.youtube.com/shorts/cuWoDobZf_4" className="text-blue-500 hover:text-blue-700">ici</a>
          </p>
        </div>
      </div>
    </div>
    )}
    {pokemonData && (
      <div className="container mx-auto mt-8 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img src={pokemonData.picture} alt="" width="100" height="50" />
          </div>
          <div className="ml-4 ">
            <h1 className="text-4xl font-bold mb-4">{pokemonData.name}</h1>
          </div>
        </div>
      </div>
    )}
  </div>

  )
}

export default Home