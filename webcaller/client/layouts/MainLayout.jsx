import React from 'react';
import AccountsUI from '../../AccountsUI.jsx';

function renderAdminNavi(){
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
        return(
            <div>
            <a href="/agents">Agents</a>
            <a href="/projects">Projects</a>
            </div>
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
                
                <a href="/">User</a>
                <AccountsUI />
            </nav>
    </header>
    <main>
        {content}
    </main>
</div>
)