import tiaoImg from "../assets/perfilImg.png";

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-2 py-8 bg-gradient-to-b from-yellow-100 to-white shadow-md rounded-b-2xl mb-8">
      <img
        src={tiaoImg}
        alt="Tião Carreiro"
        className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
      />
      <h1 className="text-3xl font-bold text-yellow-800 mt-2">
        Top 5 Músicas Mais Tocadas
      </h1>
      <h2 className="text-xl text-yellow-700 font-medium">
        Tião Carreiro & Pardinho
      </h2>
    </header>
  );
}
