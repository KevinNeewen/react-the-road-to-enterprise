import { ApiStatus, defaultApiStatuses, IDLE } from '@/api/constants/apiStatus'
import { useState, useMemo } from 'react'

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

type PreparedStatuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>

const prepareStatuses = (status: ApiStatus): PreparedStatuses => {
  const preparedStatuses = {} as PreparedStatuses

  for (let i = 0; i < defaultApiStatuses.length; i++) {
    const normalisedStatus = `is${capitalize(
      defaultApiStatuses[i].toLowerCase()
    )}` as keyof PreparedStatuses
    preparedStatuses[normalisedStatus] = defaultApiStatuses[i] === status
  }

  return {
    ...preparedStatuses,
  }
}

export const useApiStatus = (currentStatus: ApiStatus = IDLE) => {
  const [status, setStatus] = useState<ApiStatus>(currentStatus)

  //Memoized so we don't have prepare statuses on every render
  const statuses = useMemo(() => prepareStatuses(status), [status])

  return {
    status,
    setStatus,
    ...statuses,
  }
}
