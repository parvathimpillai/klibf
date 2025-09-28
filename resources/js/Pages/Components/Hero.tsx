export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[600px] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/3/3e/Kerala_legislature_building.jpg')",
      }}
    >
      <div className="bg-black/50 p-8 rounded-lg max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Welcome to Kerala Legislature</h1>
        <h2 className="text-2xl font-semibold mb-4">International Book Festival</h2>
        <p className="text-lg">
          4th Edition<br />
          2026 JANUARY 7-13
        </p>
      </div>
    </section>
  );
}
