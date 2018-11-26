import React, { Component } from 'react';
import { Button, Card, Form, FormGroup, Label, Input, Col, Row, ListGroupItem } from 'reactstrap';

export default class FormPart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            urunAdi: props.urunAdi || '',
            urunKodu: props.urunKodu || '',
            urunMik: props.urunMik || 0,
            urunBirim: props.urunBirim || 0,
            tutar: props.tutar || 0,
            isEdit: 0
        }

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props.newFormValues);
        console.log(nextProps.newFormValues);
        if ((!this.props.newFormValues && nextProps.newFormValues)
            || (this.props.newFormValues && nextProps.newFormValues && this.props.newFormValues.id !== nextProps.newFormValues.id)) {
            this.setState({
                isEdit: 1,
                urunAdi: nextProps.newFormValues.urunAdi,
                urunKodu: nextProps.newFormValues.urunKodu,
                urunMik: nextProps.newFormValues.urunMik,
                urunBirim: nextProps.newFormValues.urunBirim,
                tutar: nextProps.newFormValues.tutar
            });
            console.log("state change");
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

        if (this.state.isEdit) {
            formValues = {
                urunAdi: this.props.newFormValues.urunAdi,
                urunKodu: this.props.newFormValues.urunKodu,
                urunMik: this.props.newFormValues.urunMik,
                urunBirim: this.props.newFormValues.urunBirim,
                tutar: this.props.newFormValues.tutar,
            }
            this.props.action(formValues);
        }
        this.setState({ isEdit: 0 });

        console.log(formValues);
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
                        <Button onClick={this.onFormSubmit} color="success" className="EkleButton">Ürün Ekle</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}