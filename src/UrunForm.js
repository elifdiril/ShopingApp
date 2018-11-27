import React, { Component } from 'react';
import { Button, Card, Form, FormGroup, Label, Input, Col, Row, ListGroupItem } from 'reactstrap';

export default class UrunForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            urunAdi: props.urunAdi || '',
            urunKodu: props.urunKodu || '',
            urunMik: props.urunMik || 0,
            urunBirim: props.urunBirim || 0,
            tutar: props.tutar || 0
        }

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.backHandle = this.backHandle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ((!this.props.newFormValues && nextProps.newFormValues)
            || (this.props.newFormValues && nextProps.newFormValues && this.props.newFormValues.id !== nextProps.newFormValues.id)) {
            this.setState({
                urunAdi: nextProps.newFormValues.urunAdi,
                urunKodu: nextProps.newFormValues.urunKodu,
                urunMik: nextProps.newFormValues.urunMik,
                urunBirim: nextProps.newFormValues.urunBirim,
                tutar: nextProps.newFormValues.tutar
            });
        }
      }

    inputChangeHandler(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        let tutar = this.state.tutar;

        if (fieldName === "urunMik")
            tutar = fieldValue * this.state.urunBirim;
        else if (fieldName === "urunBirim")
            tutar = fieldValue * this.state.urunMik;

        this.setState({
            [fieldName]: fieldValue,
            tutar: tutar
        });
    }

    backHandle() {
        this.props.backHandle();
    }

    onFormSubmit() {
        if (!this.state.urunAdi)
            return;

        let formValues = {
            urunAdi: this.state.urunAdi,
            urunKodu: this.state.urunKodu,
            urunMik: this.state.urunMik,
            urunBirim: this.state.urunBirim,
            tutar: this.state.tutar,
        }

        this.props.action(formValues);
    }

    render() {

        return (
            <div>
                <Card className="FormFrame">
                    <Form>
                        <text className="title">Form</text>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Ürün Adı</Label>
                                    <Input type="text" name="urunAdi" id="urunAdi" onChange={this.inputChangeHandler} value={this.state.urunAdi} />
                                </Col>
                                <Col>
                                    <Label>Ürün Kodu</Label>
                                    <Input type="text" name="urunKodu" id="urunKodu" onChange={this.inputChangeHandler} value={this.state.urunKodu} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label>Ürün Miktarı</Label>
                                    <Input type="number" name="urunMik" id="urunMik" onChange={this.inputChangeHandler} value={this.state.urunMik} />
                                </Col>
                                <Col>
                                    <Label>Ürün Birim Fiyatı</Label>
                                    <Input type="number" name="urunBirim" id="urunBirim" onChange={this.inputChangeHandler} value={this.state.urunBirim} />
                                </Col>
                                <Col>
                                    <Label>Ürün Tutarı</Label>
                                    <ListGroupItem style={{ height: 38 }}>{this.state.tutar}</ListGroupItem>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormButtons
                            isEdit={this.props.isEdit}
                            onFormSubmit={this.onFormSubmit}
                            backHandle={this.backHandle} />
                    </Form>
                </Card>
            </div>
        );
    }
}

const FormButtons = (props) => {
    const { isEdit = false, onFormSubmit, backHandle } = props;

    if (isEdit) {
        return (
            <div>
                <Button onClick={onFormSubmit} color="success" className="DüzenleButton"> Düzenle </Button>
                <Button onClick={backHandle} color="danger" className="VazgecButton"> Vazgeç </Button>
            </div>);
    }
    else {
        return (<Button onClick={onFormSubmit} color="success" className="EkleButton">Ürün Ekle</Button>);
    }
};