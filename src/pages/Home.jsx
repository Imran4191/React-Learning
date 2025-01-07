import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';

function Home() {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [types, setTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 20;

    const getPokemonTypes = async () => {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/type');
            const data = await res.json();
            setTypes(data.results);
        } catch (error) {
            console.error('Failed to fetch Pokémon types:', error);
        }
    };

    const getPokemonPage = async (page) => {
        try {
            const offset = (page - 1) * limit;
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
            const data = await res.json();

            const detailedPokemonList = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    const details = await res.json();
                    return {
                        name: pokemon.name,
                        url: pokemon.url,
                        types: details.types || [],
                    };
                })
            );

            setPokemonList(detailedPokemonList);
            setTotalPages(Math.ceil(data.count / limit));
        } catch (error) {
            console.error('Failed to fetch Pokémon data:', error);
        }
    };

    useEffect(() => {
        getPokemonTypes();
        getPokemonPage(currentPage);
    }, [currentPage]);

    const filteredPokemon = pokemonList
        .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((pokemon) =>
            selectedType === 'all'
                ? true
                : Array.isArray(pokemon.types) && pokemon.types.some((type) => type.type.name === selectedType)
        );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search Pokémon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg w-full max-w-md shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="all">All Types</option>
                    {types.map((type) => (
                        <option key={type.name} value={type.name}>
                            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPokemon.length > 0 ? (
                    filteredPokemon.map((pokemon) => (
                        <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 text-lg font-medium">
                        No Pokémon found
                    </div>
                )}
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;
