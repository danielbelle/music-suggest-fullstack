export default function MusicCard({ rank, item }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${item.youtube_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block mb-4"
    >
      <div className="flex items-center bg-white rounded-lg shadow-md p-4 hover:bg-yellow-50 transition">
        <div className="text-2xl font-bold text-yellow-600 w-8 text-center">
          {rank}
        </div>
        <img
          src={item.thumb}
          alt={`Thumbnail ${item.titulo}`}
          className="w-16 h-16 rounded-md object-cover mx-4"
        />
        <div className="flex-1">
          <div className="font-semibold text-lg">{item.titulo}</div>
          <div className="text-gray-500 text-sm">
            {item.visualizacoes} visualizações
          </div>
        </div>
      </div>
    </a>
  );
}
