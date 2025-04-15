import { useState } from 'react'
import {InputBox} from './components'
// we don't have to write full directory because by default index file is called
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const currencyOptions = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * (currencyInfo[to]))
  }

  const backgroundImage = "https://t3.ftcdn.net/jpg/04/34/58/54/360_F_434585463_zpdtTpTEbqQFfsp6RVEW6IIxEM9dHf86.jpg"


  return (
    <>
      <div className='w-full h-screen bg-cover bg-no-repeat place-content-center'
        style={{backgroundImage:`url(${backgroundImage})`}}
      >
        <div className='w-full'>
          <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className='w-full mb-1 mt-4 bg-white rounded-lg'>
                <InputBox 
                  label="From"
                  amount={amount}
                  currencyOptions={currencyOptions}
                  onCurrencyChange={(currency) => {setFrom(currency)}}
                  onAmountChange={(amount) => {setAmount(amount)}}
                  selectCurrency={from}
                  />
              </div>

              <div className='relative w-full h-0.5'>
                <button
                  type = "button"
                  className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-3 py-0.5 outline-none'
                  onClick={swap}
                > swap </button>

              </div>

              <div className='w-full mt-2 mb-4 bg-white rounded-lg'>
                <InputBox
                  label = "to"
                  amount={convertedAmount}
                  currencyOptions={currencyOptions}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />

              </div>

              <button
                type="submit"
                className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
              
            </form>
          </div>
        </div>

      </div>
     
    </>
  )
}

export default App
