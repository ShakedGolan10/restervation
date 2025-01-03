'use client';

import { endLoader, openSuccessModal, setError, startLoader } from "../store/system.actions.ts"


interface AsyncOpArgs<T extends unknown[]> {
  asyncOps: (() => Promise<T[number]>)[]
  successMsg?: string
  errorMsg?: string
  isLoaderDisabled?: boolean 
}

export const useAsync = () => {
  const executeAsyncFunction = async <T extends unknown[]>(args: AsyncOpArgs<T>) => {
    const { asyncOps, successMsg, errorMsg, isLoaderDisabled } = args
    if (!isLoaderDisabled) startLoader()
    try {
        const promises = asyncOps.map((func) => func())
        const result = await Promise.all(promises)
        if (successMsg) openSuccessModal(successMsg)
        return result as T
    } catch (error) {
      setError(errorMsg)
    } finally {
      if (!isLoaderDisabled) endLoader()
    }
  }

  return [ executeAsyncFunction ]
}
