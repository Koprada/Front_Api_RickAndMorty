import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import Pagination from "./components/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState("https://rickandmortyapi.com/api/character");
  const [info, setInfo] = useState({});

  // Efecto para obtener información de la página actual
  useEffect(() => {
    const fetchInfo = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setInfo(data.info);
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };

    fetchInfo(currentPage);
  }, [currentPage]);

  const onPrevious = () => {
    if (info.prev) {
      setCurrentPage(info.prev);
    }
  };

  const onNext = () => {
    if (info.next) {
      setCurrentPage(info.next);
    }
  };

  return (
    <div className="container mt-1 bg-black ">
      {/* Componente Main para mostrar personajes */}
      <Main currentPage={currentPage} setCurrentPage={setCurrentPage} info={info} />
      {/* Componente Pagination para controlar la paginación */}
      <Pagination
        prev={info.prev}
        next={info.next}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
}

export default App;
