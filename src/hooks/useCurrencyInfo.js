import { useEffect, useState } from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        console.log(1);
        fetch(`https://v6.exchangerate-api.com/v6/6b7c3079cd49415a94f6e190/latest/${currency}`)
        .then((res) => res.json())
        .then((res) => setData(res["conversion_rates"]))
    }, [currency])
    
    return data;
}

export default useCurrencyInfo;