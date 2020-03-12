import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import StellarSdk from 'stellar-sdk';
import firebase from './Firebase';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // Constructor to init state
  constructor(props){
    super(props);
    this.state = {
      stellerTestUrl: "https://horizon-testnet.stellar.org",
      log: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    // Create server object and save to state
    const server = new StellarSdk.Server(this.state.stellerTestUrl);

    // Check if URLs align
    const server_response_url =  server.serverURL._parts.protocol + "://" + server.serverURL._parts.hostname;
    if( server_response_url === this.state.stellerTestUrl ) {
      // Set log info
      const log = new Date() + " : Connection successful to Steller Horizon Network.";
      
      this.setState({
        log: [...this.state.log, log]
      })
    }else {
      // Set log info
      const log = new Date() + " : Connection failed to Steller Horizon Network.";
      
      this.setState({
        log: [...this.state.log, log]
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    // Create new account on Stellar first
    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
    const source = StellarSdk.Keypair.fromSecret('SBX2RPEN7JGEFDFCM2EDPWBTVM5RKP37CGPHLXOXIFZ77WG62Z6RGSQG')
    const destination = StellarSdk.Keypair.random()

    // Give 1 XLM as initial balance
    server.accounts()
      .accountId(source.publicKey())
      .call()
      .then(({ sequence }) => {
        const account = new StellarSdk.Account(source.publicKey(), sequence)
        const transaction = new StellarSdk.TransactionBuilder(account, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET
        })
        .addOperation(StellarSdk.Operation.createAccount({
          destination: destination.publicKey(),
          startingBalance: '1'
        }))
        .setTimeout(30)
        .build()
        transaction.sign(StellarSdk.Keypair.fromSecret(source.secret()))
        return server.submitTransaction(transaction)
      })
      .then(results => {
        // Save on firebase
        const db = firebase.firestore();
        db.collection("accounts").add({
          fullnames: data.get("fullnames"),
          email: data.get("email"),
          account_pubkey: destination.publicKey(),
          account_secret: destination.secret(),
          transaction_href: results._links.transaction.href,
          timestamp: new Date()
        });
        
        // Log new state
        const log = new Date() + 
                    " : Account " + destination.publicKey().substring(0,5) + "... created." +
                    " View transaction at : " + results._links.transaction.href + "."

        this.setState({
          log: [...this.state.log, log]
        })
      })
  };
  
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
                  <Form style={{"textAlign":"left"}} onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label>Full Names</Form.Label>
                      <Form.Control type="text" name="fullnames" placeholder="Enter your fullnames" required />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" name="email" placeholder="Enter your email address" required />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
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
                      {this.state.log.reverse().map((log) => {
                        return(
                          <p>{log}</p>
                        )
                      })}
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
