import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class ClientSalesList extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            sales: this.props.sales,
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
        }
    }

    componentWillReceiveProps( nextProps ){
        this.setState({
            sales: nextProps.sales,
        });
    }

    render(){
        console.log(this.state.sales[0]);
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
                                <TableRowColumn>{ sale.productname } </TableRowColumn>
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


ClientSalesList.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

ClientSalesList.propTypes = {
    sales: PropTypes.array.isRequired,
};