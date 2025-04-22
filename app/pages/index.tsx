"use client";

import { useState, useEffect } from "react";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Fetch Pokémon types for the dropdown
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => setTypes(data.results));
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      const url = `https://pokeapi.co/api/v2/type/${selectedType}`;
      const response = await fetch(url);
      const data = await response.json();

      // Filter Pokémon based on search query
      const filteredPokemons = data.pokemon.filter((pokemon) =>
        pokemon.pokemon.name.includes(search.toLowerCase())
      );

      setPokemons(filteredPokemons);
    };

    fetchPokemons();
  }, [search, selectedType]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleTypeChange = (e) => setSelectedType(e.target.value);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Example PokemonList Screen UI</h1>
      <div className="flex gap-4 mb-6">
        <select
          className="p-2 border rounded-md"
          onChange={handleTypeChange}
          value={selectedType}
        >
          <option value="">Select</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon, index) => (
            <div key={index} className="border p-4 rounded-md">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.pokemon.url.split("/")[6]
                }.png`}
                alt={pokemon.pokemon.name}
                className="w-24 h-24 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">
                {pokemon.pokemon.name}
              </h2>
              <button className="text-blue-500 text-center block mt-4">
                Details →
              </button>
            </div>
          ))
        ) : (
          <div>No Pokémon found for this search.</div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;

// import { useState, useEffect } from "react"; // No need for React import in App Router
// import Link from "next/link";

// const PokemonList = () => {
//   const [pokemons, setPokemons] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedType, setSelectedType] = useState("all");
//   const [types, setTypes] = useState([]);

//   useEffect(() => {
//     // Fetch Pokémon types for the dropdown
//     fetch("https://pokeapi.co/api/v2/type")
//       .then((res) => res.json())
//       .then((data) => setTypes(data.results));
//   }, []);

//   useEffect(() => {
//     // Fetch Pokémon data based on the search and selected type
//     let url = `https://pokeapi.co/api/v2/pokemon?limit=20`;
//     if (selectedType !== "all") {
//       url = `https://pokeapi.co/api/v2/type/${selectedType}`;
//     }

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setPokemons(data.pokemon || data.results));
//   }, [search, selectedType]);

//   const handleSearchChange = (e: any) => setSearch(e.target.value);

//   const handleTypeChange = (e: any) => setSelectedType(e.target.value);

//   return (
//     <>
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-4">Example PokemonList Screen UI</h1>
//         <div className="flex gap-4 mb-6">
//           <select
//             className="p-2 border rounded-md"
//             onChange={handleTypeChange}
//             value={selectedType}
//           >
//             <option value="all">Select Pokémon Type</option>
//             {types.map((type) => (
//               <option key={type.name} value={type.name}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             className="p-2 border rounded-md"
//             placeholder="Search..."
//             value={search}
//             onChange={handleSearchChange}
//           />
//           <button className="bg-blue-500 text-white p-2 rounded-md">
//             Search
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pokemons.map((pokemon, index) => (
//             <div key={index} className="border p-4 rounded-md">
//               {/* <img
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//                   pokemon.url.split("/")[6]
//                 }.png`}
//                 alt={pokemon.name}
//                 className="w-24 h-24 mx-auto mb-4"
//               /> */}
//               <img
//                 src={
//                   pokemon.url
//                     ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//                         pokemon.url.split("/")[6]
//                       }.png`
//                     : "default-image.png" // fallback image when URL is undefined
//                 }
//                 alt={pokemon.name}
//                 className="w-24 h-24 mx-auto mb-4"
//               />

//               <h2 className="text-xl font-semibold text-center">
//                 {pokemon.name}
//               </h2>
//               <Link
//                 href={`/pokemon/${pokemon.name}`}
//                 className="text-blue-500 text-center block mt-4"
//               >
//                 Details →
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PokemonList;
