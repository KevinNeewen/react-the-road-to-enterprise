import { ERROR, IDLE, PENDING, SUCCESS } from '@/api/constants/apiStatus'
import { useState } from 'react'
import { useApiStatus } from './useApiStatus'

type UseApiConfig<TData> = {
  initialData?: TData
}

type UseApiFn<TData extends unknown> = (
  ...args: unknown[]
) => TData | Promise<TData>

const useApi = <TData = unknown, TError = unknown>(
  fn: UseApiFn<TData>,
  config: UseApiConfig<TData> = {}
) => {
  const { initialData } = config

  const [data, setData] = useState<TData | undefined>(initialData)
  const [error, setError] = useState<TError | unknown>(undefined)
  const {
    //
    setStatus,
    isIdle,
    isPending,
    isSuccess,
    isError,
  } = useApiStatus(IDLE)

  const exec = async <A extends unknown>(...args: A[]) => {
    if (!fn) {
      throw new Error('fn has to be defined when using useApi')
    }

    try {
      setStatus(PENDING)
      const response = await fn(...args)
      setData(response)
      setStatus(SUCCESS)
      return {
        data,
        error: null,
      }
    } catch (error) {
      setStatus(ERROR)
      setError(error)
      return {
        error,
        data: null,
      }
    }
  }

  return {
    data,
    error,
    exec,
    isIdle,
    isPending,
    isSuccess,
    isError,
  }
}

export default useApi
