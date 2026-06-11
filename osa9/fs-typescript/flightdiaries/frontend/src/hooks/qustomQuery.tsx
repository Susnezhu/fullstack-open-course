import { useState } from "react"

export const useField = (name: string, type="text") => {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    name,
    value,
    type,
    onChange,
    reset,
  }
}

