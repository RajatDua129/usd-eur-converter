import { useState } from "react";
import { Container } from "react-bootstrap";
import ConverterComponent from "./components/ConverterComponent";
import TableComponent from "./components/TableComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const App = () => {
  const [tableData, setTableData] = useState([]);

  // to add new record in the table
  const addRecord = (newRecord) => {
    let table = tableData;
    if (table.length === 5) {
      table.shift();
    }
    table.push(newRecord);
    setTableData([...table]);
  };

  // to clear the table history
  const clearHistory = () => {
    setTableData([]);
  };

  return (
    <StyledContainer>
      <Container className="inner-container">
        <StyledCardContainer>
          <ConverterComponent addData={addRecord} clearHistory={clearHistory} />
          {tableData.length > 0 && <TableComponent newRecord={tableData} />}
        </StyledCardContainer>
      </Container>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right, #ffffff 70%, #f0f0f0);

  .inner-container {
    margin: 0;
    width: 100%;
    padding: 0;
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  width: 100%;
  height: 100vh;

  @media only screen and (max-width: 850px) {
    flex-direction: column;
    padding: 30px 20px;
    overflow: auto;
    justify-content: flex-start;
  }
`;

export default App;
