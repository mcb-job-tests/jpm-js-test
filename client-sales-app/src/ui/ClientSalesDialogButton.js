import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import {cyan500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import ClientSalesList from './ClientSalesList';
import Paper from 'material-ui/Paper';

export default class ClientSalesDialogButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            client: this.props.client,
            openDialog: false,
        }
    }

    componentWillReceiveProps( nextProps ){
        this.setState({
            client: nextProps.client,
        });
    }

    handleSalesIconButtonClick(){
        console.log('handleSalesIconButtonClick');
        this.setState({
            openDialog:true,
        })
    }

    handleCancelButton(){
        this.setState({
            openDialog: false,
        });
    }

    renderClientSalesList(){
        return (
            < Paper>
                <ClientSalesList
                    sales={ this.state.client.sales }
                />
            </Paper>
        )
    }

    render(){
        const styles = {
            smallIcon: {
                width: 26,
                height: 26,
                textAlign: 'center',
                borderRadius: 26,
                margin: -10,
                borderWidth: 2,
                padding: '4px',
                borderStyle: 'solid',
                color: this.context.muiTheme.palette.accent1Color,
                borderColor: this.context.muiTheme.palette.accent1Color,
            },
            smallIconDisabled: {
                width: 26,
                height: 26,
                textAlign: 'center',
                borderRadius: 26,
                margin: -10,
                borderWidth: 2,
                padding: '4px',
                borderStyle: 'solid',
                color: this.context.muiTheme.palette.disabledColor,
                borderColor: this.context.muiTheme.palette.disabledColor,
            }
        };

        const customDialogStyle = {
            width: '100%',
            maxWidth: 'none',
            borderColor: cyan500,
            borderStyle: 'solid',
            borderWidth: 4,
        };

        const dialogActionStyle = {
            margin: 12,
        };

        const dialogActions = [
            < RaisedButton
                label='Close'
                primary={ true }
                onTouchTap={ this.handleCancelButton.bind( this ) }
                className='flex-item col-5'
                style={ dialogActionStyle }
            />,
        ];

        const dialogTitle = 'Client Sales (' + this.state.client.first_name + ' ' + this.state.client.surname + ')';

        return(
            <div>
                <IconButton
                    disabled={ this.state.client.sales.length === 0 }
                    className={ 'flex-container' }
                    iconStyle={ this.state.client.sales.length === 0 ? styles.smallIconDisabled : styles.smallIcon }
                    onClick={ this.handleSalesIconButtonClick.bind( this ) }
                >

                    <ListIcon
                        className={ 'flex-item' }
                        style={ { display:'block', margin:'auto' } }
                    />
                </IconButton>
                < Dialog
                    title={ dialogTitle }
                    actions={ dialogActions }
                    actionsContainerClassName="flex-container flex-dialog-box col-12"
                    modal={ true }
                    open={ this.state.openDialog }
                    contentStyle={ customDialogStyle }
                >
                    { this.state.openDialog ? this.renderClientSalesList() : "" }
                </ Dialog>
            </div>
        );


    }
}


ClientSalesDialogButton.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

ClientSalesDialogButton.propTypes = {
    client: PropTypes.object.isRequired,
};