import { fetchDog } from '@/api/animalApi'
import { withAsync } from '@/helpers/withAsync'
import { useEffect, useState } from 'react'
import { IDLE, PENDING, SUCCESS, ERROR } from '@/api/constants/apiStatus'
import { useApiStatus } from '@/hooks/useApiStatus'
import LazySpinner from '../LazySpinner/LazySpinner'

const useFetchDog = () => {
  const [dog, setDog] = useState<string>()
  const {
    //
    setStatus,
    ...rest
  } = useApiStatus(IDLE)

  const initFetchDog = async () => {
    setStatus(PENDING)
    const { response, error } = await withAsync(() => fetchDog())
    if (error) {
      setStatus(ERROR)
    } else if (response) {
      setDog(response.data.message)
      setStatus(SUCCESS)
    }
  }

  return {
    dog,
    initFetchDog,
    ...rest,
  }
}

function AnimalExampleWithApiStates() {
  const {
    //
    dog,
    isPending: isDogStatusPending,
    isIdle: isDogStatusIdle,
    isSuccess: isDogStatusSuccess,
    isError: isDogStatusError,
    initFetchDog,
  } = useFetchDog()

  useEffect(() => {
    initFetchDog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex justify-center gap-8">
      <div className="flex justify-center gap-8">
        <div className="w-64 h-64">
          {isDogStatusIdle ? <p>Welcome</p> : null}
          {<LazySpinner show={isDogStatusPending} delay={100} />}
          {isDogStatusError ? <p>There was a problem</p> : null}
          {isDogStatusSuccess ? (
            <img className="h-64 w-full object-cover" src={dog} alt="Dog" />
          ) : null}
        </div>
      </div>
      <button
        onClick={initFetchDog}
        className="mt-4 bg-blue-800 text-blue-100 p-4"
      >
        Fetch animals
      </button>
    </div>
  )
}

export default AnimalExampleWithApiStates
