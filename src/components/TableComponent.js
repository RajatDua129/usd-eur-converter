import { Table, Card } from "react-bootstrap";
import styled from "styled-components";

const TableComponent = ({ newRecord }) => {
  return (
    <StyledCardBody>
      <p className="heading">History</p>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr className="col-name-text">
              <th>#</th>
              <th>Initial Amount</th>
              <th>Fx Rate</th>
              <th>Custom Rate</th>
              <th>Converted Amount</th>
            </tr>
          </thead>
          <tbody>
            {newRecord.map((value, index) => (
              <tr key={index} className="col-name-text">
                <td>{index + 1}</td>
                <td>
                  {value.initialAmount} {value.inputCurrency}
                </td>
                <td>{value.fxRate}</td>
                <td>{value.override}</td>
                <td>
                  {value.convertedAmount}{" "}
                  {value.inputCurrency === "USD" ? "EUR" : "USD"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </StyledCardBody>
  );
};

const StyledCardBody = styled.div`
  border: 1px solid green;
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

  @media only screen and (max-width: 450px) {
    padding: 10px;
  }

  .heading {
    font-size: 1.2rem;
    border-bottom: 4px solid #05e7bc;
    width: 40px;
    white-space: nowrap;
    padding: 10px 0;
  }

  .col-name-text {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #717385;
    background-color: #ffffff00;
  }
`;

export default TableComponent;
