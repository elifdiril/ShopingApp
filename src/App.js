import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Form from './Form';
import ShopingList from './ShopingList';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    // istek
    this.setState({
      items: [
        {
          urunAdi: "sony",
          urunKodu: "tv",
          urunMiktari: 10,
          urunBirimFiyati: 5
        },
        {
          urunAdi: "lg",
          urunKodu: "buzdolabi",
          urunMiktari: 10,
          urunBirimFiyati: 10
        }
      ]
    })
  }

  render() {
    //let _this = this;
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="6">
              <Form />
            </Col>
            <Col xs="6">
              <ShopingList title="Sepetteki Ürünler" urunList={this.state.items} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;