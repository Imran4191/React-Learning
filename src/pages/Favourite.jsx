import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (name) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
        <p className="text-gray-600">No Pokémon added to favorites yet!</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((pokemon) => (
          <div
            key={pokemon.name}
            className="bg-white shadow-md rounded-lg overflow-hidden p-4 relative"
          >
            <h2 className="text-xl font-semibold capitalize text-center">
              {pokemon.name}
            </h2>
            <div className="flex justify-center mt-4">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24"
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/pokemon/${pokemon.name}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => removeFromFavorites(pokemon.name)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourite;
