type WithAsyncReturn<TData, TError> = {
  response: TData | null
  error: TError | unknown
}

type WithAsyncFn<T extends unknown> = (...args: unknown[]) => T | Promise<T>

export async function withAsync<TData = unknown, TError = unknown>(
  fn: WithAsyncFn<TData>
): Promise<WithAsyncReturn<TData, TError>> {
  try {
    if (typeof fn !== 'function') {
      throw new Error('First argument must be a function.')
    }

    const response = await fn()

    return {
      response,
      error: null,
    }
  } catch (error) {
    return {
      response: null,
      error,
    }
  }
}
