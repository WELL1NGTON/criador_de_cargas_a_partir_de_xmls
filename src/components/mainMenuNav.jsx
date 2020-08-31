import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class MainMenuNav extends Component {
  state = {
    selected: '/',
  };

  NONE_ACTIVE = '/';
  MONTAR_CARGA = '/montar-carga';
  VISUALIZAR_CARGAS = '/visualizar-cargas';
  ABOUT = '/about';

  getClassName(navItem) {
    return 'nav-link' + (this.state.selected == navItem ? ' active' : '');
  }

  getToLink(navItem) {
    return this.state.selected == navItem ? this.NONE_ACTIVE : navItem;
  }

  onNavItemClick(navItem) {
    let selected = this.state.selected == navItem ? this.NONE_ACTIVE : navItem;
    this.setState({ selected });
  }

  render() {
    return (
      <ul className="nav nav-tabs small m-1">
        <li className="nav-item">
          <Link className={this.getClassName(this.MONTAR_CARGA)} to={this.getToLink(this.MONTAR_CARGA)} onClick={() => this.onNavItemClick(this.MONTAR_CARGA)}>
            Montar Carga
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={this.getClassName(this.VISUALIZAR_CARGAS)}
            to={this.getToLink(this.VISUALIZAR_CARGAS)}
            onClick={() => this.onNavItemClick(this.VISUALIZAR_CARGAS)}
          >
            Vizualizar Cargas
          </Link>
        </li>
        <li className="nav-item">
          <Link className={this.getClassName(this.ABOUT)} to={this.getToLink(this.ABOUT)} onClick={() => this.onNavItemClick(this.ABOUT)}>
            Sobre
          </Link>
        </li>
      </ul>
    );
  }
}

export default MainMenuNav;
