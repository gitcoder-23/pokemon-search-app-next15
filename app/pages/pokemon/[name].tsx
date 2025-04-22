"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PokemonDetails = () => {
  const router = useRouter();
  const { name } = router.query;
  console.log("name=> ", name);

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => res.json())
        .then((data) => setPokemon(data));
    }
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{pokemon.name}</h1>
        <div className="flex gap-4">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-48 h-48"
          />
          <div>
            <p>
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p>
              <strong>Base Experience:</strong> {pokemon.base_experience}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold">Abilities</h2>
        <ul className="mt-2">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="text-blue-500">
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;
