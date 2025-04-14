import { useState, useEffect } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
    const [amount, setAmount] = useState(1)
    const [from, setFrom] = useState("USD")
    const [to, setTo] = useState("INR")
    const [convertedAmount, setConvertedAmount] = useState(0)

    const { data: currencyInfo, loading, error } = useCurrencyInfo(from)
    const options = Object.keys(currencyInfo || {})

    const swap = () => {
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }

    const convert = () => {
        if (!currencyInfo || !currencyInfo[to]) return
        setConvertedAmount(amount * currencyInfo[to])
    }

    useEffect(() => {
        if (currencyInfo && currencyInfo[to]) {
            convert()
        }
    }, [amount, from, to, currencyInfo])

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="text-2xl text-white font-semibold animate-pulse">
                    Loading exchange rates...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-600">
                <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-2">Error</div>
                    <div>{error}</div>
                </div>
            </div>
        )
    }

    return (
        <main className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat"
              style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
              }}>
            <div className="w-full max-w-md mx-4">
                <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
                    <h1 className="text-3xl font-bold text-white text-center mb-6">
                        Money Converter
                    </h1>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        convert()
                    }}>
                        <div className="mb-4">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency.toUpperCase())}
                                selectCurrency={from}
                                onAmountChange={(val) => setAmount(Number(val))}
                            />
                        </div>

                        <div className="relative h-8 flex items-center justify-center">
                            <button
                                type="button"
                                onClick={swap}
                                className="absolute bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
                            >
                                ⇅
                            </button>
                        </div>

                        <div className="mb-6">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency.toUpperCase())}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>

                        <div className="text-center text-white text-xl mb-6">
                            {amount} {from} = {convertedAmount.toFixed(2)} {to}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-semibold transition-colors"
                        >
                            Convert {from} to {to}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default App
