import React, { Component } from 'react';
import { Card, Form, FormGroup, Button } from 'reactstrap';

export default class ShopList extends Component {

  render() {
    const { urunList, title } = this.props;

    if (urunList)
      return (
        <Card className="FormFrame">

          <Form>
            <FormGroup>
              <text className="title" for="exampleText">Alışveriş Listesi</text>
              <table style={{ border: "1px solid black;" }}>
                <thead>
                  <tr>
                    <th>urun adı</th>
                    <th>urun kodu</th>
                    <th>urun tutarı</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    urunList.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.urunAdi}</td>
                          <td>{item.urunKodu}</td>
                          <td>{item.tutar}</td>
                          <td><Button color="warning" onClick={() => this.props.selectHandle(item.urunKodu)}>Seç</Button></td>
                          <td><Button color="danger" onClick={() => this.props.deleteHandle(item.urunKodu)}>Sil</Button></td>
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