import React from 'react';
import AccountsUI from '../../AccountsUI.jsx';

function AdminNavi(){
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
        return(
            <label className="adminNavi">
                <a href="/agents">Agents</a>
                <a href="/projects">Projects</a>
            </label>
        );
    }else{
        return <div></div>;
    }
}

export const MainLayout = ({content}) => (
    <div className="main-layout">
    <header>
            <h2>WebCaller</h2>
            <nav>
                <AdminNavi />   
                <a href="/agents">Agents</a>
                <a href="/projects">Projects</a>
                <a href="/calllists">Call lists</a>
                <a href="/">User</a>
                <AccountsUI />
            </nav>
    </header>
    <main>
        {content}
    </main>
</div>
)