import React, { Component } from 'react';
import firebase from '../Firebase';
import { Container, Row, Col, Card, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Richlist extends Component {
    // Constructor to init state
    constructor(props){
        super(props);
        this.state = {
            richlist: []
        }
    };

    componentDidMount() {
        // Get the richlist from firebase
        const db = firebase.firestore();
        db.collection("accounts").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data()
              this.setState({
                richlist: [...this.state.richlist, data]
              })
            });
        });
    };

    render() {
        return (
            <div className="App">
              <Container>
                <Row>
                  <Col sm>
                    <h1 style={{"paddingTop":"16px"}}>stellar-demo</h1>
                    <h6 style={{"paddingTop":"4px"}}><Link to="/">Home</Link> / by Mwangi Kabiru / <Link to="/richlist">View Richlist</Link></h6>
                    <hr style={{"width":"100%"}} />
                  </Col>
                </Row>
    
                <Row>
                    <Col sm={12}>
    
                      <div style={{"width":"100%", "marginTop":"20px"}}>
                        <Card>
                          <Card.Header>Richlist</Card.Header>
                          <Card.Body>
                            <Table striped style={{"textAlign":"left"}}>
                              <thead>
                                <tr>
                                  <th>Account</th>
                                  <th>KES4202_v2 Tokens</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.richlist.map((account) => {
                                  return(
                                    <tr>
                                      <td>{account.account_pubkey}</td>
                                      <td>{account.kes4202_v2_tokens} kes4202_v2</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </Card.Body>
                        </Card>
                      </div>
    
                    </Col>
                </Row>
              </Container>  
            </div>
        );
    }
}

export default Richlist;