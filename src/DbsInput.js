import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';

export default class DbsInput extends Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(this.props.fieldName, e.target.value);
    }

    render() {
        return (
            <div width="100px">
                <Label>{this.props.label}</Label>
                <Input
                    fieldName={this.props.fieldName}
                    value={this.props.value}
                    onChange={this.onChange}
                    type={this.props.type} />
            </div>
        );
    }

}