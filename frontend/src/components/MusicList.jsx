import MusicCard from "./MusicCard";

export default function MusicList({ top5 }) {
  return (
    <div>
      <h3 className="section-title">Ranking Atual</h3>
      {top5.length === 0 ? (
        <div className="text-gray-500">Nenhuma música cadastrada.</div>
      ) : (
        top5.map((item, idx) => (
          <MusicCard key={item.id} rank={idx + 1} item={item} />
        ))
      )}
    </div>
  );
}
