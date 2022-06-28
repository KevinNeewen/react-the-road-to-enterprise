import { fetchCat, fetchDog } from '@/api/animalApi'
import { useCallback, useEffect, useState } from 'react'

const useFetchDog = () => {
  const [dog, setDog] = useState<string>()
  const initFetchDog = async () => {
    const response = await fetchDog()
    setDog(response.data.message)
  }
  return {
    dog,
    initFetchDog,
  }
}

const useFetchCat = () => {
  const [cat, setCat] = useState<string>()
  const initFetchCat = async () => {
    const response = await fetchCat()
    setCat(response.data?.[0].url)
  }
  return {
    cat,
    initFetchCat,
  }
}

const useFetchAnimals = () => {
  const { dog, initFetchDog } = useFetchDog()
  const { cat, initFetchCat } = useFetchCat()

  const fetchAnimals = () => {
    initFetchDog()
    initFetchCat()
  }

  useEffect(() => {
    fetchAnimals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    dog,
    cat,
    fetchAnimals,
  }
}

export default useFetchAnimals
