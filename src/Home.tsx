export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="text-2xl font-bold mb-4">Welcome to guessing game!</p>
      <a
        className="p-2 mt-4 bg-blue-500 text-white rounded-md w-32 text-center"
        href="/game"
      >
        Start Game
      </a>
    </div>
  );
}
