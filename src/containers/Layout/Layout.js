import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Nevigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Nevigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (<Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer
                show={this.state.showSideDrawer}
                close={this.sideDrawerToggleHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>);
    }
}

export default Layout;