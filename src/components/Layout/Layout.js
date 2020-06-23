import React from 'react';
import Aux from '../../hoc/Auxilary';
import layoutClasses from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, BackDrop</div>
        <main className = {layoutClasses.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;