import React from 'react';
import {mount} from 'react-mounter';
import Contacts from './contacts/Contacts.jsx';
import ProjectPage from './projects/ProjectPage.jsx';
import AgentsPage from './agents/AgentsPage.jsx';
import ProjectEdit from './projects/ProjectEdit';

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