import React, { Component } from 'react';
import { Card, Form, FormGroup, Button } from 'reactstrap';

export default class ShopList extends Component {

  render() {
    const { urunList = [] } = this.props;

    if (urunList)
      return (
        <Card className="UrunFrame">

          <Form>
            <FormGroup>
              <span className="title" >Alışveriş Listesi</span>
              <table className= "tableFrame" >
                <thead>
                  <tr>
                    <th>urun adı</th>
                    <th>urun türü</th>
                    <th>urun tutarı</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    urunList.map((item, index) => {
                      return (
                        <tr key={index} className="listItems">
                          <td>{item.urunAdi}</td>
                          <td>{item.urunTuru}</td>
                          <td>{item.tutar}</td>
                          <td><Button className="buttonPick" color="warning" onClick={() => this.props.selectHandle(item.urunKodu)}>Seç</Button></td>
                          <td><Button className="buttonPick" color="danger" onClick={() => this.props.deleteHandle(item.urunKodu)}>Sil</Button></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </FormGroup>
          </Form>
        </Card>
      );
    else
      return <span>henüz ürün yok</span>;
  }
}