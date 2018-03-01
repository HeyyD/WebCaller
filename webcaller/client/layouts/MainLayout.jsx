import React from 'react';
import AccountsUI from '../../AccountsUI.jsx';

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