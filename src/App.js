import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Form from './Form';
import ShopingList from './ShopingList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          urunAdi: "sony",
          urunKodu: "tv",
          urunMik: 10,
          urunBirim: 5,
          tutar:50
        },
        {
          urunAdi: "lg",
          urunKodu: "buzdolabi",
          urunMik: 10,
          urunBirim: 10,
          tutar:100
        }
      ],
      formValues: []
    }
    this.formHandler = this.formHandler.bind(this);

  }

  formHandler(dataFromForm) {

    this.setState({
      formValues: dataFromForm
    });

    this.state.items.push(this.state.formValues);
  }


  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="6">
              <Form action={this.formHandler} />
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