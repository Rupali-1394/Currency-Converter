import { useState, useEffect } from 'react'

function useCurrencyInfo(currency) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                console.log('Fetching data for currency:', currency)
                const response = await fetch(`https://v6.exchangerate-api.com/v6/6b7c3079cd49415a94f6e190/latest/${currency}`)
                console.log('API Response:', response)
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                
                const result = await response.json()
                console.log('API Result:', result)
                
                if (result.result === 'success') {
                    setData(result.conversion_rates)
                } else {
                    throw new Error(result['error-type'] || 'Failed to fetch exchange rates')
                }
            } catch (error) {
                console.error("Error fetching currency data:", error)
                setError(error.message)
                setData({})
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [currency])

    return { data, loading, error }
}

export default useCurrencyInfo