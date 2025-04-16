// InputBox.jsx

const InputBox = ({ ClassName = "", label, amount, currencyOptions, onCurrencyChange, onAmountChange, selectCurrency, amountDisable }) => {
  return (
    <div className={`bg-white rounded-lg text-sm p-3 flex ${ClassName}`}>
      <label className="block text-gray-700">{label}</label>
      <div className="flex items-center space-x-2">
        <select
          value={selectCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="w-1/3 p-2 border rounded-md"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={isNaN(amount) ? "" : amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-2/3 p-2 border rounded-md"
          disabled={amountDisable}
        />

      </div>
    </div>
  );
}

export default InputBox; // Exporting as default
