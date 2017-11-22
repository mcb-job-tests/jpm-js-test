import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios'; // make http REST requests
import Paper from 'material-ui/Paper';
import ClientSalesDialogButton from './ClientSalesDialogButton';
import '../App.css';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class ClientsTableView extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            clients: [],
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

    componentDidMount() {
        this.updateClientArray();
    }

    componentWillReceiveProps( props ) {
        if ( props.tableViewType === 'CLIENTS') {
            this.updateClientArray();
        }
    }

    updateClientArray(){
        let _this = this;
        Axios
            .get( this.state.apiURL + 'clients/' )
            .then( ( result ) => {
                let newClientArray = [];

                const data = result.data;
                for ( let i = 0; i < data.length; i++ ) {
                    const clientData = data[ i ];
                    const clientObj = {
                        id : clientData.id,
                        sales: [],
                        first_name: clientData.firstname,
                        surname: clientData.surname,
                        company: clientData.company,
                        telephone: clientData.telephone,
                        country: clientData.country,
                    };
                    newClientArray.push( clientObj );
                }

                _this.setState({
                    clients: newClientArray
                }, this.updateClientsSalesArray
                );
            });
    }

    updateClientsSalesArray(){
        let _this = this;
        Axios
            .get( this.state.apiURL + 'sales/' )
            .then( ( result ) => {

                let updatedClients = _this.state.clients;

                const salesData = result.data;
                console.log(salesData);

                for ( let i = 0; i < salesData.length; i++ ) {
                    let saleData = salesData[ i ];
                    let clientId = saleData.clientId;
                    let foundIndex = -1;

                    for( let j = 0; j < updatedClients.length; j++ ){

                        if ( clientId === updatedClients[j].id ) {
                            foundIndex = j;
                            break;
                        }
                    }
                    if ( foundIndex === -1 ) {
                        console.log('updateClientsSalesArray: client with id ' + clientId + ' not found!');
                    } else {
                        let client = updatedClients[ foundIndex ];
                        client.sales.push( saleData );
                    }
                }

                _this.setState({
                    clients: updatedClients
                });
            });
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
                            <TableHeaderColumn> Sales </TableHeaderColumn>
                            <TableHeaderColumn> Client ID </TableHeaderColumn>
                            <TableHeaderColumn> First Name </TableHeaderColumn>
                            <TableHeaderColumn> Surname </TableHeaderColumn>
                            <TableHeaderColumn> Company </TableHeaderColumn>
                            <TableHeaderColumn> Telephone </TableHeaderColumn>
                            <TableHeaderColumn> Country </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.clients.map( (client, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>
                                    <ClientSalesDialogButton
                                        client={ client }
                                    />
                                </TableRowColumn>
                                <TableRowColumn>{ client.id }</TableRowColumn>
                                <TableRowColumn>{ client.first_name }</TableRowColumn>
                                <TableRowColumn>{ client.surname }</TableRowColumn>
                                <TableRowColumn>{ client.company }</TableRowColumn>
                                <TableRowColumn>{ client.telephone }</TableRowColumn>
                                <TableRowColumn>{ client.country }</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

ClientsTableView.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

ClientsTableView.propTypes = {
    tableViewType: PropTypes.string.isRequired,
    apiURL: PropTypes.string.isRequired,
};