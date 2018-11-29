import React, { Component } from 'react';
import { DropdownList } from 'react-widgets';
import { Label } from 'reactstrap';

export default class DbsDropDown extends Component {

    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onChange(val) {
        this.props.onChange(this.props.fieldName, val.kod);
    }

    onSelect(val) {
        this.props.onSelect(this.props.fieldName, val.kod);
    }

    render() {
        return (
            <div width="100px">
                <Label>{this.props.label}</Label>
                <DropdownList
                    fieldName={this.props.fieldName}
                    data={this.props.urunTurleri}
                    textField={this.props.textField}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    value={this.props.value}
                />
            </div>
        );
    }

}
