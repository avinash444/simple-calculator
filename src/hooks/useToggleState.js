import { useState } from 'react'

const useToggleState = (initialValue = false) => {
    const [state, setState] = useState(initialValue);
    const toggle = () => {
       setState(!state);
    }
    return [state,toggle]
}

export default useToggleState;