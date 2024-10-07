import React, { useEffect, useState } from "react";

const Main = ({ currentPage, setCurrentPage }) => {
  const [characters, setCharacters] = useState([]);
  const [expandedCharacterId, setExpandedCharacterId] = useState(null);

  useEffect(() => {
    const getCharacters = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCharacters(data.results);
        setCurrentPage(url); // Actualiza la página actual
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    getCharacters(currentPage); // Llama cada vez que cambia la página
  }, [currentPage, setCurrentPage]); // Incluye las dependencias necesarias

  const handleToggleDetails = (characterId) => {
    setExpandedCharacterId(
      expandedCharacterId === characterId ? null : characterId
    );
  };

  return (
    <div className="container mx-auto p-4 bg-black">
      <h1 className="text-3xl font-bold mb-8 text-center text-lime-500">
        Rick and Morty Characters
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className="relative border-2 border-yellow-500 h-96 rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${character.image})` }}
            />
            <div className="relative z-10 p-4 bg-black bg-opacity-70">
              <h2 className="text-xl font-bold text-center mb-2 text-white">
                {character.name}
              </h2>
              <p className="text-center text-gray-200">
                Status:{" "}
                <span className="font-semibold">{character.status}</span>
              </p>
              <p className="text-center text-gray-200">
                Species:{" "}
                <span className="font-semibold">{character.species}</span>
              </p>
              <p className="text-center text-gray-200">
                Origin:{" "}
                <span className="font-semibold">{character.origin?.name || "Unknown"}</span>
              </p>
              <p className="text-center text-gray-200">
                Location:{" "}
                <span className="font-semibold">{character.location?.name || "Unknown"}</span>
              </p>
              <div className="flex justify-around mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleToggleDetails(character.id)}
                >
                  Detalles
                </button>
              </div>
              {expandedCharacterId === character.id && (
                <div className="mt-4 text-white max-h-48 overflow-y-auto">
                  <h3 className="text-lg font-semibold">Episodios</h3>
                  <ul className="mt-2">
                    {character.episode.map((episodeUrl, index) => (
                      <li key={index} className="mt-1">
                        <a
                          href={episodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {`Episodio ${index + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
