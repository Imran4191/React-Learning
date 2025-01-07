import React from 'react';
import { Link } from 'react-router';

function PokemonCard({ pokemon }) {
    const id = pokemon.url.split('/')[pokemon.url.split('/').length - 2];
    return (
        <div className="bg-gray-100 p-4 rounded">
            <h3 className="uppercase text-center ...">{pokemon.name}</h3>
            <Link to={`/pokemon/${pokemon.name}`}>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={pokemon.name}
                />
                <Link to={`/pokemon/${pokemon.name}`} className="block text-center text-blue-500 mt-2">
                View Details
                </Link>
            </Link>
        </div>
    );
}

export default PokemonCard;
