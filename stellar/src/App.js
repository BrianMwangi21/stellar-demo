import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm={8}>
            <h1>stellar-demo</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
