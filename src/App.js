import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Container } from "react-bootstrap";
import UserTable from "./components/UserTable";

function App() {
  return (
    <Container>
      <h1 className="text-center mt-5 mb-3">User Data</h1>
      <UserTable />
    </Container>
  );
}

export default App;
