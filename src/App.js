import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import UrunForm from './UrunForm';
import ShopingList from './ShopingList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: "1",
          urunAdi: "sony",
          urunKodu: "tv",
          urunMik: 10,
          urunBirim: 5,
          tutar: 50
        },
        {
          id: "2",
          urunAdi: "lg",
          urunKodu: "buzdolabi",
          urunMik: 10,
          urunBirim: 10,
          tutar: 100
        }
      ],
      newFormValues: {
        urunAdi: "",
        urunKodu: "",
        urunMik: 0,
        urunBirim: 0,
        tutar: 0
      }
    }
    this.formHandler = this.formHandler.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
    this.selectHandle = this.selectHandle.bind(this);
    this.backHandle = this.backHandle.bind(this);
  }

  selectHandle(urunKodu) {
    const index = this.state.items.findIndex(x => x.urunKodu === urunKodu);
    if (index !== -1) {
      const newItem = {};

      const currItem = this.state.items[index];

      newItem.id = currItem.id;
      newItem.urunAdi = currItem.urunAdi;
      newItem.urunKodu = currItem.urunKodu;
      newItem.urunMik = currItem.urunMik;
      newItem.urunBirim = currItem.urunBirim;
      newItem.tutar = currItem.tutar;
      this.setState({ newFormValues: newItem });
    }
  }

  deleteHandle(urunKodu) {
    const index = this.state.items.findIndex(x => x.urunKodu === urunKodu);
    if (index !== -1) {
      const newArray = JSON.parse(JSON.stringify(this.state.items));
      newArray.splice(index, 1);
      this.setState({ items: newArray });
    }
  }

  formHandler(dataFromForm) {
    const newItems = JSON.parse(JSON.stringify(this.state.items));
    newItems.push(dataFromForm);
    this.setState({ items: newItems });
  }

  backHandle() {
    this.setState({
      newFormValues: {
        urunAdi: "",
        urunKodu: "",
        urunMik: 0,
        urunBirim: 0,
        tutar: 0
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="6">
              <UrunForm action={this.formHandler}
                backHandle={this.backHandle}
                newFormValues={this.state.newFormValues}
                isEdit={!!(this.state.newFormValues && this.state.newFormValues.id)} />
            </Col>
            <Col xs="6">
              <ShopingList //title="Sepetteki Ürünler"
                urunList={this.state.items}
                deleteHandle={this.deleteHandle}
                selectHandle={this.selectHandle} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;