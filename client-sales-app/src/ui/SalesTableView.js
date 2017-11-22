import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios'; // make http rest requests

import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class SalesTableView extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            sales: [],
            apiURL: this.props.apiURL,
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '100%',
        };
    }

    updateSalesArray(){
        let _this = this;
        Axios
            .get( this.state.apiURL + 'sales/' )
            .then( ( result ) => {
                let newSalesArray = [];

                const data = result.data;
                for ( let i = 0; i < data.length; i++ ) {
                    const salesData = data[ i ];
                    const salesObj = {
                        id: salesData.id,
                        clientId: salesData.clientId,
                        productName: salesData.productname,
                        price: salesData.price,
                        size: salesData.size,
                    };
                    newSalesArray.push( salesObj );
                }

                _this.setState({
                    sales: newSalesArray
                });
            });
    }


    componentDidMount() {
        this.updateSalesArray();
    }

    componentWillReceiveProps(props) {
        if ( props.tableViewType === 'SALES') {
            this.updateSalesArray();
        }
    }

    render(){

        return(
            <Paper>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn>Sale ID</TableHeaderColumn>
                            <TableHeaderColumn>Client ID</TableHeaderColumn>
                            <TableHeaderColumn>Product Name</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                            <TableHeaderColumn>Size</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.sales.map( ( sale, index ) => (
                            <TableRow key={ index }>
                                <TableRowColumn> { sale.id } </TableRowColumn>
                                <TableRowColumn>{ sale.clientId } </TableRowColumn>
                                <TableRowColumn>{ sale.productName } </TableRowColumn>
                                <TableRowColumn>{ sale.price } </TableRowColumn>
                                <TableRowColumn>{ sale.size } </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

SalesTableView.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

SalesTableView.propTypes = {
    tableViewType: PropTypes.string.isRequired,
    apiURL: PropTypes.string.isRequired,
};
