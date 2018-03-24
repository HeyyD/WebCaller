import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';

export default class AccountsUI extends Component{

    constructor(props){
        super(props);
        Accounts.ui.config({
            passwordSignupFields: 'USERNAME_ONLY',
        });
    }

    componentDidMount(){
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount(){
        Blaze.remove(this.view);
    }

    render(){
        return <span ref="container" />
    }
}