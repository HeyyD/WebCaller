import React from 'react';
import {mount} from 'react-mounter';
import Contacts from './contacts/Contacts.jsx';
import ProjectPage from './projects/ProjectPage.jsx';
import AgentsPage from './agents/AgentsPage.jsx';
import CallListPage from './calllists/CallListPage.jsx';
import CallListContents from './calllists/CallListContents.jsx';

import {MainLayout} from './layouts/MainLayout.jsx';


FlowRouter.route('/', {
    action() {
        mount(MainLayout, {
            content: (<Contacts />)
        })
    }
});

FlowRouter.route('/projects', {
    action(){
        mount(MainLayout, {
            content: (<ProjectPage />)
        })
    }
});

FlowRouter.route('/projects/:id', {
    action(params) {
        mount(MainLayout, {
            content: (<p>{params.id}</p>)
        })
    }
});

FlowRouter.route('/agents', {
    action(params) {
        mount(MainLayout, {
            content: (<AgentsPage />)
        })
    }
});

FlowRouter.route('/calllists', {
    action(params) {
        mount(MainLayout, {
            content: (<CallListPage />)
        })
    }
});

FlowRouter.route('/calllists/:id', {
    action(params) {
        mount(MainLayout, {
            content: (<CallListContents id={params.id}/>)
        })
    }
});