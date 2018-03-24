import React from 'react';
import {mount} from 'react-mounter';
import Contacts from './contacts/Contacts.jsx';
import ProjectPage from './projects/ProjectPage.jsx';

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
            content: (<p>Hello world!</p>)
        })
    }
});