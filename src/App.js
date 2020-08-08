import React, { useEffect, useState, useReducer } from "react";
import Currency from "./components/Currency/Currency";
import { reducer } from "./reducer/reducer";
import { ACTIONS } from "./reducer/actions";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    currency1: "",
    amount1: 1,
    currency2: "",
    amount2: 1,
  });
  const [rates, setRates] = useState([]);
  const [date, setDate] = useState("");

  const updateAmount1 = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_AMOUNT1,
      payload: {
        newAmount: e.target.value,
      },
    });
    const currencyRate1 = rates.filter(
      (rate) => state.currency1 === rate.curName
    );
    const currencyRate2 = rates.filter(
      (rate) => state.currency2 === rate.curName
    );
    const newAmount =
      (currencyRate1[0].key / currencyRate2[0].key) * +e.target.value;
    dispatch({
      type: ACTIONS.UPDATE_AMOUNT2,
      payload: { newAmount: newAmount },
    });
  };

  const updateAmount2 = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_AMOUNT2,
      payload: {
        newAmount: e.target.value,
      },
    });
    const currencyRate1 = rates.filter(
      (rate) => state.currency1 === rate.curName
    );
    const currencyRate2 = rates.filter(
      (rate) => state.currency2 === rate.curName
    );
    const newAmount =
      (currencyRate2[0].key / currencyRate1[0].key) * +e.target.value;
    dispatch({
      type: ACTIONS.UPDATE_AMOUNT1,
      payload: { newAmount: newAmount },
    });
  };

  const setAmount1 = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_CURRENCY1_NAME,
      payload: { currency: e.target.value },
    });

    const currencyRate1 = rates.filter(
      (rate) => e.target.value === rate.curName
    );
    const currencyRate2 = rates.filter(
      (rate) => state.currency2 === rate.curName
    );
    const newAmount =
      (currencyRate1[0].key / currencyRate2[0].key) * state.amount1;

    dispatch({
      type: ACTIONS.UPDATE_AMOUNT2,
      payload: { newAmount: newAmount },
    });
  };

  const setAmount2 = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_CURRENCY2_NAME,
      payload: { currency: e.target.value },
    });

    const currencyRate1 = rates.filter(
      (rate) => state.currency1 === rate.curName
    );
    const currencyRate2 = rates.filter(
      (rate) => e.target.value === rate.curName
    );
    const newAmount =
      (currencyRate2[0].key / currencyRate1[0].key) * state.amount2;

    dispatch({
      type: ACTIONS.UPDATE_AMOUNT1,
      payload: { newAmount: newAmount },
    });
  };

  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
      .then((res) => res.json())
      .then((res) => {
        const apiRates = [];
        for (const key in res.rates) {
          apiRates.push({ curName: key, key: res.rates[key] });
        }
        setRates(apiRates);
        setDate(res.date);
        dispatch({
          type: ACTIONS.UPDATE_CURRENCY1_NAME,
          payload: { currency: apiRates[26].curName },
        });
        dispatch({
          type: ACTIONS.UPDATE_CURRENCY2_NAME,
          payload: { currency: apiRates[29].curName },
        });

        const currencyRate1 = apiRates.filter(
          (rate) => apiRates[0].curName === rate.curName
        );
        const currencyRate2 = apiRates.filter(
          (rate) => apiRates[1].curName === rate.curName
        );

        const newAmount = currencyRate1[0].key / currencyRate2[0].key;
        dispatch({
          type: ACTIONS.UPDATE_AMOUNT2,
          payload: { newAmount: newAmount },
        });
      });
  }, []);
  return (
    <>
      <header>
        <h1>currency converter</h1>
        <hr />
      </header>
      <main>
        <div className="data">
          <p className="from">
            {parseFloat(state.amount1)}
            <span> {state.currency1}</span> is equivalent to
          </p>
          <p className="to">
            {parseFloat(state.amount2)} <span>{state.currency2}</span>
          </p>
          <p className="date">As of {date}</p>
        </div>
        <Currency
          selectedOption={state.currency1}
          rates={rates}
          amount={state.amount1}
          setAmount={setAmount1}
          dispatch={updateAmount1}
        />
        <Currency
          selectedOption={state.currency2}
          rates={rates}
          amount={state.amount2}
          setAmount={setAmount2}
          dispatch={updateAmount2}
        />
      </main>
    </>
  );
}

export default App;
