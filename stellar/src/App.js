import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import StellarSdk from 'stellar-sdk';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // Constructor to init state
  constructor(props){
    super(props);
    this.state = {
      stellarClient: null,
      stellerTestUrl: "https://horizon-testnet.stellar.org",
      log: ""
    }
  };

  componentDidMount() {
    // Create server object and save to state
    const server = new StellarSdk.Server(this.state.stellerTestUrl);

    // Check if URLs align
    const server_response_url =  server.serverURL._parts.protocol + "://" + server.serverURL._parts.hostname;
    if( server_response_url === this.state.stellerTestUrl ) {
      // Set log info
      const log = new Date() + " : Connection successful to Steller Horizon Network. \n\n" + this.state.log; 
      this.setState({
        stellarClient : server,
        log: log
      })
    }else {
      // Set log info
      const log = new Date() + " : Connection failed to Steller Horizon Network. \n\n" + this.state.log; 
      this.setState({
        log: log
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col sm>
              <h1 style={{"paddingTop":"16px"}}>stellar-demo</h1>
              <h6 style={{"paddingTop":"4px"}}>by Mwangi Kabiru</h6>
              <hr style={{"width":"100%"}} />
            </Col>
          </Row>

          <Row>
              <Col sm={7}>
                <Card>
                  <Card.Header>Creare an account</Card.Header>
                  <Card.Body>
                  <Form style={{"textAlign":"left"}}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={5}>
                <Card>  
                  <Card.Header>Log</Card.Header>
                  <Card.Body style={{"textAlign":"left", "fontSize":"12px"}}>
                    <p>
                      {this.state.log}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        </Container>  
      </div>
    );
  }
}

export default App;
