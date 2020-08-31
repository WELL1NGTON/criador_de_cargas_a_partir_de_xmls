import React, { Component } from 'react';
import MainMenuNav from './mainMenuNav';
import NewTruckLoad from './newTruckLoad';
import About from './about';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ViewTruckLoads from './viewTruckLoads';
class MainMenu extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <MainMenuNav />
            <Switch>
              <Route path="/" exact component={null} />
              <Route path="/montar-carga">
                <NewTruckLoad
                  onAddSelectedFilesToTruck={this.props.onAddSelectedFilesToTruck}
                  onRemoveTruck={this.props.onRemoveTruck}
                  onAddNewTruck={this.props.onAddNewTruck}
                  onNewTruckTextAreaOnChange={this.props.onNewTruckTextAreaOnChange}
                  onSelectTruck={this.props.onSelectTruck}
                  textAreaAddNewTruck={this.props.textAreaAddNewTruck}
                  selectedTruck={this.props.selectedTruck}
                  trucks={this.props.trucks}
                />
              </Route>
              <Route path="/visualizar-cargas">
                <ViewTruckLoads
                  onShowClassifiedFiles={this.props.onShowClassifiedFiles}
                  onShowAllFiles={this.props.onShowAllFiles}
                  onShowUnclassifiedFiles={this.props.onShowUnclassifiedFiles}
                  onRemoveTruck={this.props.onRemoveTruck}
                  onAddNewTruck={this.props.onAddNewTruck}
                  onNewTruckTextAreaOnChange={this.props.onNewTruckTextAreaOnChange}
                  onSelectTruck={this.props.onSelectTruck}
                  textAreaAddNewTruck={this.props.textAreaAddNewTruck}
                  selectedTruck={this.props.selectedTruck}
                  trucks={this.props.trucks}
                />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default MainMenu;
