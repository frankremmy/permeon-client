import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { Menu, Icon, Divider } from "semantic-ui-react";
import styles from './Sidebar.css';
import {selectors} from "../../reducers";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(event, {name}) {}

  render() {
    const { width, location, activeAccount } = this.props;
    const activeItem = 'home';
    const path = location.pathname;

    return (
      <Menu
        className={styles.Sidebar}
        vertical
        fixed='left'
        style={{width}}
      >
        <Menu.Item name='home' active={path === '/'} onClick={this.handleItemClick} as={Link} to="/">
          Home
          <Icon name="home"/>
        </Menu.Item>
        <Menu.Item name='channel' active={path === '/channel'} onClick={this.handleItemClick} as={Link} to={`/channel/${activeAccount}`}>
          My Channel
          <Icon name="grid layout"/>
        </Menu.Item>
        <Divider />
        <Menu.Item name='settings' active={path === '/settings'} onClick={this.handleItemClick} as={Link} to="/settings">
          Settings
          <Icon name="setting"/>
        </Menu.Item>
      </Menu>
    );
  }
}

Sidebar.propTypes = {};

function mapStateToProps(state) {
  return {
    activeAccount: selectors.auth.activeAccountName(state),
  }
}

export default withRouter(connect(mapStateToProps)(Sidebar));
