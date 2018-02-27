import React from 'react';
import {mount} from 'react-mounter';
import Contacts from './contacts/Contacts.jsx';

import {MainLayout} from './layouts/MainLayout.jsx';

FlowRouter.route('/', {
    action() {
        mount(MainLayout, {
            content: (<Contacts />)
        })
    }
});