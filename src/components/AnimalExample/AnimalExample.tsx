import useFetchAnimals from './hooks/useFetchAnimals'

function AnimalExample() {
  const { dog, cat, fetchAnimals } = useFetchAnimals()
  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex gap-8">
        <div className="w-1/2">
          {cat ? (
            <img className="h-64 w-full object-cover" src={cat} alt="Cat" />
          ) : null}
        </div>
        <div className="w-1/2">
          {dog ? (
            <img className="h-64 w-full object-cover" src={dog} alt="Dog" />
          ) : null}
        </div>
      </div>
      <button
        onClick={fetchAnimals}
        className="mt-4 bg-blue-800 text-blue-100 p-4"
      >
        Fetch animals
      </button>
    </div>
  )
}
export default AnimalExample
