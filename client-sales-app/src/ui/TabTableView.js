import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ClientsTableView from './ClientsTableView.js';
import SalesTableView from './SalesTableView.js';

import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

/*const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};*/

/*function handleActive(tab) {
    alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}*/

export default class TabController extends Component {

    constructor ( props ) {
        super(props);
        this.state = {
            tableViewType: this.props.tableViewType,
            apiURL: this.props.apiURL,
        };
    }


    handleActiveSalesTab() {
        this.setState({
            tableViewType:'SALES',
        });
        console.log( 'handleActiveSalesTab' );
    }

    handleActiveClientsTab() {
        this.setState({
            tableViewType:'CLIENTS',
        });
        console.log( 'handleActiveClientsTab' );
    }

    render(){
        return(
            <Tabs>
                <Tab label="Clients"
                     onActive={ this.handleActiveClientsTab.bind( this ) }
                >
                    <Paper>
                        < ClientsTableView
                            tableViewType={ this.state.tableViewType }
                            apiURL={ this.state.apiURL }
                        />
                    </Paper>
                </Tab>
                <Tab label="Sales"
                     onActive={ this.handleActiveSalesTab.bind( this ) }
                >
                    <Paper>
                        < SalesTableView
                            tableViewType={ this.state.tableViewType }
                            apiURL={ this.state.apiURL }
                        />
                    </Paper>
                </Tab>
            </Tabs>
        )
    }
}

TabController.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

TabController.propTypes = {
    tableViewType: PropTypes.string.isRequired,
    apiURL: PropTypes.string.isRequired,
};