import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import styled from "styled-components";

const INITIAL_CURRENCY = "EUR";
const INITIAL_FXRATE = 1.1;
const PERCENTAGE = 0.02;

const ConverterComponent = ({ addData, clearHistory }) => {
  const [fxRate, setFxRate] = useState(INITIAL_FXRATE);
  const [inputCurrency, setInputCurrency] = useState(INITIAL_CURRENCY);

  const [customInput, setCustomInput] = useState(false);
  const [override, setoverride] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);

  // to generate random currency rate
  const generateCurrencyRate = () => {
    return INITIAL_FXRATE + Math.random() * 0.1 - 0.05;
  };

  // to check fx rate not greater than 2% of current rate
  const greaterThanThreeshold = (val1, val2) => {
    const difference = Math.abs(val1 - val2);
    const threshold = PERCENTAGE * Math.max(val1, val2);
    return difference > threshold;
  };

  // to change fxRate at every 3 second
  const changeRatePerThreeSecond = () => {
    setFxRate(generateCurrencyRate().toFixed(3));
  };

  // to switch between currency
  const handleCurrencyChange = (value) => {
    value === "USD" ? setInputCurrency("EUR") : setInputCurrency("USD");
    setInputValue(convertedValue);
  };

  // to convert currency
  const currencyConverter = () => {
    let rate = customInput
      ? greaterThanThreeshold(fxRate, override)
        ? fxRate
        : override
      : fxRate;

    if (inputCurrency === "USD") {
      setConvertedValue((inputValue / rate).toFixed(3));
    } else {
      setConvertedValue((inputValue * rate).toFixed(3));
    }
  };

  useEffect(() => {
    setInterval(changeRatePerThreeSecond, 3000);
  }, []);

  useEffect(() => {
    currencyConverter();
  }, [fxRate, inputValue]);

  return (
    <StyledCardBody>
      <p className="heading">Currency Converter</p>
      <div className="card-body">
        <Card.Body>
          <Form className="form-body">
            <Form.Group controlId="formPlaintextEmail">
              <div className="options label-text">
                <div className="d-flex item-center">
                  <p className="m-0">Override Rate</p>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    value={customInput}
                    onChange={(e) => setCustomInput(!customInput)}
                  />
                </div>

                <div className="d-flex item-center">
                  <div>
                    {inputCurrency === "EUR" ? (
                      <span style={{ color: "#0C6DFD" }}>EUR</span>
                    ) : (
                      "EUR"
                    )}
                    <Form.Check
                      className="d-inline mx-2"
                      type="switch"
                      id="custom-switch"
                      value={inputCurrency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                    />
                    {inputCurrency === "USD" ? (
                      <span style={{ color: "#0C6DFD" }}>USD</span>
                    ) : (
                      "USD"
                    )}
                  </div>
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="formPlaintextEmail">
              <div className="label-text">
                <Form.Label>Fx Rate</Form.Label>
              </div>
              <Form.Control
                readOnly
                disabled={customInput}
                type="text"
                value={fxRate}
                className="readonly-fx"
              />
            </Form.Group>

            {customInput && (
              <Form.Group controlId="formPlaintextPassword">
                <div className="label-text">
                  <Form.Label style={{ color: "#0C6DFD" }}>
                    Override Rate
                  </Form.Label>
                </div>
                <Form.Control
                  type="number"
                  value={override}
                  onChange={(e) => setoverride(e.target.value)}
                />
              </Form.Group>
            )}

            <Form.Group controlId="formPlaintextPassword">
              <div className="label-text">
                <Form.Label>{inputCurrency}</Form.Label>
              </div>
              <Form.Control
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPlaintextPassword">
              <div className="label-text">
                <Form.Label>
                  {inputCurrency === "USD" ? "EUR" : "USD"}
                </Form.Label>
              </div>

              <Form.Control type="number" disabled value={convertedValue} />
            </Form.Group>

            <StyledButtonContainer>
              <Button
                className="button"
                onClick={() =>
                  addData({
                    fxRate: fxRate,
                    override: override,
                    inputCurrency: inputCurrency,
                    initialAmount: inputValue,
                    convertedAmount: convertedValue,
                  })
                }
              >
                Save
              </Button>

              <Button className="button" onClick={() => clearHistory()}>
                Clear History
              </Button>
            </StyledButtonContainer>
          </Form>
        </Card.Body>
      </div>
    </StyledCardBody>
  );
};

const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
  padding: 30px;
  border-radius: 12px;
  border: 2px solid #eaebf2;

  @media only screen and (max-width: 850px) {
    width: 100%;
  }

  .form-body {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  .heading {
    font-size: 1.2rem;
    border-bottom: 4px solid rgba(12, 109, 253, 1);
    width: 40px;
    white-space: nowrap;
    padding: 10px 0;
  }

  .readonly-fx {
    border: none;
    background-color: #fff;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  }

  .item-center {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .label-text {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #717385;
    padding: 0;
    white-space: nowrap;
  }

  .card-body {
    padding: 0;
    width: fit-content;

    .options {
      display: flex;
      gap: 30px;
      align-items: center;
      justify-content: center;
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .button {
    font-family: "Roboto", sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    padding: 15px;
    white-space: nowrap;
  }

  .button:hover {
    background-color: rgba(12, 109, 253, 1);
    box-shadow: 0px 15px 20px rgba(12, 109, 253, 0.4);
    color: #fff;
    transform: translateY(-4px);
  }
`;

export default ConverterComponent;
