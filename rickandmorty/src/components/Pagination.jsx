import React from "react";

const Pagination = ({ prev, next, onPrevious, onNext }) => {
  return (
    <div className="flex justify-center  mt-4 bg-black">
      {prev && (
        <button
          className="bg-lime-500 hover:bg-green-700 m-3 pr-5 pl-5 text-white font-bold py-2 px-4 rounded"
          onClick={onPrevious}
        >
          Previous
        </button>
      )}
      {next && (
        <button
          className="bg-lime-500 hover:bg-green-700 m-3 pr-5 pl-5 text-white font-bold py-2 px-4 rounded"
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
