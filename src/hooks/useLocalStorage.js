import { useEffect, useState } from 'react'

const useLocalStorage = (localStorageKey, initialValue) => {
  const [data, setData] = useState(
    // Initiate item from localStorage or initialValue
    JSON.parse(localStorage.getItem(localStorageKey)) || initialValue
  )

  useEffect(() => {
    // Set localStorage item to stringify data
    localStorage.setItem(localStorageKey, JSON.stringify(data))
  }, [data])

  return [data, setData]
}

export default useLocalStorage
