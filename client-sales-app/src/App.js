import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TabTableView from './ui/TabTableView.js';
import Paper from 'material-ui/Paper';

injectTapEventPlugin();


class App extends Component {

    constructor(){
        super();
        this.state = {
            apiURL: "http://localhost:8080/api/",
            tableViewType: 'CLIENTS'
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <Paper className="App">
                <header className="App-header">
                    <Paper className="flex-container" style={{ flexDirection: "column" }}>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">JPM Technical Challenge</h1>
                    </Paper>
                </header>
                < TabTableView
                    apiURL={ this.state.apiURL }
                    tableViewType={ this.state.tableViewType }
                />
            </Paper>
        );
    }
}

App.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default App;
