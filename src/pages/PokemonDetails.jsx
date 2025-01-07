import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.name === data.name));
      });
  }, [name]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.name !== pokemon.name);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const newFavorite = {
        name: pokemon.name,
        image: pokemon.sprites.front_default,
      };
      favorites.push(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  if (!pokemon)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <h1 className="text-4xl font-bold text-center capitalize mb-4">
            {pokemon.name}
          </h1>
          <div className="flex justify-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48"
            />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <ul className="list-disc list-inside text-gray-700">
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name} className="capitalize">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Types</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full text-white capitalize ${
                      type.type.name === "fire"
                        ? "bg-red-500"
                        : type.type.name === "water"
                        ? "bg-blue-500"
                        : type.type.name === "grass"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Base Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pokemon.stats.map((stat) => (
                <div
                  key={stat.stat.name}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded"
                >
                  <span className="capitalize text-gray-600">
                    {stat.stat.name}
                  </span>
                  <span className="font-bold text-gray-800">
                    {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={toggleFavorite}
              className={`px-6 py-2 rounded font-semibold ${
                isFavorite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
