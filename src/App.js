import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import UrunForm from './UrunForm';
import ShopingList from './ShopingList';
import Request from "superagent";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newFormValues: {
        urunId: 0,
        urunAdi: "",
        urunKodu: "",
        urunMik: 0,
        urunBirim: 0,
        tutar: 0,
        urunTuru:''
      },
      dropDownItems: []
    }
    this.formHandler = this.formHandler.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
    this.selectHandle = this.selectHandle.bind(this);
    this.backHandle = this.backHandle.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }


  componentDidMount() {
    Request.get('http://www.mocky.io/v2/5bfe3f5c3100000f002cfcb9')
      .then(response => {
        if (response && response.body) {
          this.setState({items: response.body.container.items});
        }
      });

      Request.get('http://www.mocky.io/v2/5bfd471731000056002cf837')
          .then(response => {
            if (response && response.body) {
              this.setState({dropDownItems: response.body.container.urunType});
              //console.log(this.state.dropDownItems);
            }
          });
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
      newItem.urunTuru = currItem.urunTuru;
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

  editHandler(editData) {
    const editIdIndex = this.state.items.findIndex(x => x.urunKodu === editData.urunKodu);
    if (editIdIndex !== -1) {
      const editedArray = JSON.parse(JSON.stringify(this.state.items));
      editedArray.splice(editIdIndex, 1, editData);
      this.setState({ items: editedArray });
    }
    this.backHandle();
  }
  

  backHandle() {
    this.setState({
      newFormValues: {
        urunId: 0,
        urunAdi: "",
        urunKodu: "",
        urunMik: 0,
        urunBirim: 0,
        tutar: 0,
        urunTuru:''
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="6">
            {this.state.dropDownItems.length > 0 &&

              <UrunForm action={this.formHandler}
                editHandler={this.editHandler}
                backHandle={this.backHandle}
                newFormValues={this.state.newFormValues}
                isEdit={!!(this.state.newFormValues && this.state.newFormValues.id)} 
                dropDownItems={this.state.dropDownItems}/>
            }
            </Col>
            <Col xs="6">
              <ShopingList 
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