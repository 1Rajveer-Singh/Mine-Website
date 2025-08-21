import { useState } from "react";

const PaperCard = ({ paper }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-white p-5 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="text-xl font-semibold mb-1">{paper.title}</h2>
      <p className="text-sm text-gray-600 mb-1">by {paper.authors}</p>
      <p className="text-xs text-gray-500 mb-2">{paper.journal}</p>
      <p className="text-sm mb-2 line-clamp-3">{paper.abstract}</p>
      {paper.price > 0 && (
        <div className="text-sm text-red-600 font-bold mb-2">Price: ${paper.price}</div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-yellow-500">{'★'.repeat(Math.round(paper.rating))}{'☆'.repeat(5 - Math.round(paper.rating))}</span>
        <span className="text-xs text-gray-500">({paper.rating.toFixed(1)})</span>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <button className={`px-4 py-2 rounded-lg font-semibold ${paper.purchased ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          disabled={paper.purchased}
        >
          {paper.purchased ? "In Your Library" : paper.price > 0 ? `Buy Now ($${paper.price})` : "Download"}
        </button>
        <span className="text-sm text-gray-500">{paper.purchases} purchases</span>
      </div>
      {paper.purchased && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">In Your Library</div>
      )}
      {hovered && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-90 text-white text-xs p-2 rounded shadow-md w-64 z-10">
          {paper.tooltip}
        </div>
      )}
      {paper.buyers && paper.buyers.length > 0 && (
        <div className="mt-2 text-xs text-gray-700">
          <div className="font-semibold">Who Purchased:</div>
          <ul>
            {paper.buyers.map((b, i) => (
              <li key={i}>{b.name} ({b.email})</li>
            ))}
          </ul>
        </div>
      )}
      {paper.feedback && paper.feedback.length > 0 && (
        <div className="mt-2 text-xs text-gray-700">
          <div className="font-semibold">Feedback:</div>
          <ul>
            {paper.feedback.map((f, i) => (
              <li key={i}>"{f}"</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaperCard; 