import { useState } from 'react'

const useCurrentYear = () => {
    const [year] = useState(() => new Date().getFullYear())

    return year
}

export default useCurrentYear
