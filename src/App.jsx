import { useState } from 'react'
import {}

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useSate("USD")
  const [to, setTo] = useState("INR")
  condt [convertedAmount, setConvertedAmount] = useState(0)
  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }



  return (
    <>
     <h1 className="text-3xl bg-cyan-600 px-4 py-4 my-5 mx-10 text-white shadow-md text-center">Currency Converter</h1>
    </>
  )
}

export default App
