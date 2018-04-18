import React from 'react';
import {mount} from 'react-mounter';
import Contacts from './contacts/Contacts.jsx';
import ProjectPage from './projects/ProjectPage.jsx';
import AgentsPage from './agents/AgentsPage.jsx';
import ProjectEdit from './projects/ProjectEdit';
import CallListPage from './calllists/CallListPage.jsx';
import CallListContents from './calllists/CallListContents.jsx';

import {MainLayout} from './layouts/MainLayout.jsx';

FlowRouter.wait();

Tracker.autorun(() => {
    if(Roles.subscription.ready() && !FlowRouter._initialized)
        FlowRouter.initialize();
});
FlowRouter.route('/', {
    action() {
        mount(MainLayout, {
            content: (<Contacts />)
        })
    }
});

FlowRouter.route('/projects', {
    name: 'projects',
    action(){
        mount(MainLayout, {
            content: (<ProjectPage />)
        })
    }
});

FlowRouter.route('/projects/:id', {
    action(params) {
        mount(MainLayout, {
            content: (<ProjectEdit id={params.id}/>)
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