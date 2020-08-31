import React, { Component } from 'react';
import NavBar from './components/navbar';
import MainMenu from './components/mainMenu';
import NfesContainer from './components/nfesContainer';
import './App.css';
import { xml2json } from './xml2json.js';

class App extends Component {
  state = {
    xmlObjects: [],
    trucks: [],
    selectedTruck: '',
    textAreaAddNewTruck: '',
    xmlObjectsDisplayed: [],
    checkedNfes: [],
    totalWeight: 0.0,
    selectedWeight: 0.0,
  };

  handleSelectTruck = (truck) => {
    let selectedTruck = truck;
    let textAreaAddNewTruck = truck;
    this.setState({ selectedTruck, textAreaAddNewTruck });
  };

  handleSelectNfe = (nfe) => {
    let checkedNfes = [...this.state.checkedNfes];
    if (checkedNfes.includes(nfe)) checkedNfes.splice(checkedNfes.indexOf(nfe), 1);
    else checkedNfes.push(nfe);
    let selectedWeight = this.calculateSelectedWeight(this.state.xmlObjectsDisplayed, checkedNfes);
    this.setState({ checkedNfes, selectedWeight });
  };

  handleAddNewTruck = (truck) => {
    if (truck == null || truck.length == 0) return;
    let trucks = [...this.state.trucks];
    if (!this.state.trucks.includes(truck)) trucks.push(truck);
    let selectedTruck = truck;
    let textAreaAddNewTruck = truck;
    this.setState({ trucks, selectedTruck, textAreaAddNewTruck });
  };

  handleRemoveTruck = (truck) => {
    if (truck == null || truck.length == 0) return;
    let trucks = [...this.state.trucks];
    if (this.state.trucks.includes(truck)) trucks.splice(trucks.indexOf(truck), 1);
    let selectedTruck = '';
    let textAreaAddNewTruck = '';
    this.setState({ trucks, selectedTruck, textAreaAddNewTruck });
  };

  handleNewTruckTextAreaOnChange = (evt) => {
    let textAreaAddNewTruck = evt.target.value;
    this.setState({ textAreaAddNewTruck });
  };

  handleAddSelectedFilesToTruck = (truck) => {
    console.log(truck);
    if (truck == null || truck.length == 0) return;
    let xmlObjects = [...this.state.xmlObjects];
    for (const xmlObject of xmlObjects) {
      if (this.state.checkedNfes.includes(xmlObject.nfeProc.NFe.infNFe.ide.nNF)) xmlObject.truck = truck;
    }
    let checkedNfes = [];
    this.setState({ xmlObjects, checkedNfes });
    this.handleShowUnclassifiedFiles();
  };

  isXmlObjectValid = (xmlObject) => {
    if (!xmlObject == null) {
      console.log('ERROR: XML IS NULL!');
      return false;
    }
    if (xmlObject.nfeProc == null) {
      console.log(`ERROR: XML DOESN'T CONTAIN THE FIELD "nfeProc"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe == null) {
      console.log(`ERROR: XML DOESN'T CONTAIN THE FIELD "NFe"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe == null) {
      console.log(`ERROR: XML DOESN'T CONTAIN THE FIELD "infNFe"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe['@Id'] == null) {
      console.log(`ERROR: XML DOESN'T CONTAIN THE FIELD "infNFe.Id"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe.ide == null) {
      console.log(`ERROR: XML ${xmlObject.nfeProc.NFe.infNFe['@Id']} DOESN'T CONTAIN THE FIELD "ide"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe.ide.nNF == null) {
      console.log(`ERROR: XML ${xmlObject.nfeProc.NFe.infNFe['@Id']} DOESN'T CONTAIN THE FIELD "nNF"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe.dest == null) {
      console.log(`ERROR: XML ${xmlObject.nfeProc.NFe.infNFe['@Id']} DOESN'T CONTAIN THE FIELD "dest"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe.dest.enderDest == null) {
      console.log(`ERROR: XML ${xmlObject.nfeProc.NFe.infNFe['@Id']} DOESN'T CONTAIN THE FIELD "enderDest"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe.transp == null) {
      console.log(`ERROR: XML ${xmlObject.nfeProc.NFe.infNFe['@Id']} DOESN'T CONTAIN THE FIELD "transp"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe.transp.vol == null) {
      console.log(`ERROR: XML ${xmlObject.nfeProc.NFe.infNFe['@Id']} DOESN'T CONTAIN THE FIELD "vol"!`);
      return false;
    }
    if (xmlObject.nfeProc.NFe.infNFe.transp.vol.pesoB == null) {
      console.log(`ERROR: XML ${xmlObject.nfeProc.NFe.infNFe['@Id']} DOESN'T CONTAIN THE FIELD "pesoB"!`);
      return false;
    }
    return true;
  };

  getJsonFromXml = async function (file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(reader.result, 'text/xml');
        let jsonFromXml = JSON.parse(xml2json(xmlDoc, '  '));

        resolve(jsonFromXml);
      };

      reader.readAsText(file);
    });
  };

  isXmlObjectSaved(xmlObject, xmlObjects) {
    for (const xml of xmlObjects) if (xml.nfeProc.NFe.infNFe.ide.nNF === xmlObject.nfeProc.NFe.infNFe.ide.nNF) return true;
    return false;
  }

  handleFiles = async (files) => {
    let xmlObjects = [...this.state.xmlObjects];
    for (let i = 0; i < files.length; i++) {
      let jsonFromXml = await this.getJsonFromXml(files[i]);
      if (this.isXmlObjectValid(jsonFromXml) && !this.isXmlObjectSaved(jsonFromXml, xmlObjects)) {
        xmlObjects.push(jsonFromXml);
      } else {
        //TODO: display some alert
      }
    }
    this.setState({ xmlObjects });
    this.handleShowAllFiles();
  };

  handleClearFiles = () => {
    let xmlObjects = [];
    let xmlObjectsDisplayed = [];
    let checkedNfes = [];
    this.setState({ xmlObjects, xmlObjectsDisplayed, checkedNfes });
    this.handleShowAllFiles();
  };

  handleShowAllFiles = () => {
    let xmlObjectsDisplayed = [...this.state.xmlObjects];
    let checkedNfes = [];
    let totalWeight = this.calculateWeight(xmlObjectsDisplayed);
    let selectedWeight = this.calculateSelectedWeight(xmlObjectsDisplayed, checkedNfes);
    this.setState({ xmlObjectsDisplayed, checkedNfes, totalWeight, selectedWeight });
  };

  handleShowUnclassifiedFiles = () => {
    let xmlObjectsDisplayed = [...this.state.xmlObjects];
    let checkedNfes = [];
    for (let i = xmlObjectsDisplayed.length - 1; i >= 0; i--) {
      if (xmlObjectsDisplayed[i].truck != null && xmlObjectsDisplayed[i].truck != '') {
        xmlObjectsDisplayed.splice(i, 1);
      }
    }
    let totalWeight = this.calculateWeight(xmlObjectsDisplayed);
    let selectedWeight = this.calculateSelectedWeight(xmlObjectsDisplayed, checkedNfes);
    this.setState({ xmlObjectsDisplayed, checkedNfes, totalWeight, selectedWeight });
  };

  handleShowClassifiedFiles = (truck) => {
    if (truck == null || truck.length === 0) return;
    let xmlObjectsDisplayed = [...this.state.xmlObjects];
    let checkedNfes = [];
    for (let i = xmlObjectsDisplayed.length - 1; i >= 0; i--) {
      if (xmlObjectsDisplayed[i].truck == null || xmlObjectsDisplayed[i].truck != truck) {
        xmlObjectsDisplayed.splice(i, 1);
      }
    }
    let totalWeight = this.calculateWeight(xmlObjectsDisplayed);
    let selectedWeight = this.calculateSelectedWeight(xmlObjectsDisplayed, checkedNfes);
    this.setState({ xmlObjectsDisplayed, checkedNfes, totalWeight, selectedWeight });
  };

  calculateSelectedWeight = (xmlObjects, checkedNfes) => {
    let selectedWeight = 0.0;
    for (const xmlObject of xmlObjects) {
      if (checkedNfes.includes(xmlObject.nfeProc.NFe.infNFe.ide.nNF)) selectedWeight += parseFloat(xmlObject.nfeProc.NFe.infNFe.transp.vol.pesoB);
    }
    return selectedWeight;
  };

  calculateWeight = (xmlObjects) => {
    let totalWeight = 0.0;
    for (const xmlObject of xmlObjects) {
      totalWeight += parseFloat(xmlObject.nfeProc.NFe.infNFe.transp.vol.pesoB);
    }
    return totalWeight;
  };

  render() {
    return (
      <React.Fragment>
        <NavBar onFilesSelected={this.handleFiles} onClearFiles={this.handleClearFiles} />
        {/* <main className="container"></main> */}
        <MainMenu
          onAddSelectedFilesToTruck={this.handleAddSelectedFilesToTruck}
          onRemoveTruck={this.handleRemoveTruck}
          onAddNewTruck={this.handleAddNewTruck}
          onNewTruckTextAreaOnChange={this.handleNewTruckTextAreaOnChange}
          onSelectTruck={this.handleSelectTruck}
          onShowClassifiedFiles={this.handleShowClassifiedFiles}
          onShowAllFiles={this.handleShowAllFiles}
          onShowUnclassifiedFiles={this.handleShowUnclassifiedFiles}
          textAreaAddNewTruck={this.state.textAreaAddNewTruck}
          selectedTruck={this.state.selectedTruck}
          trucks={this.state.trucks}
        />
        <NfesContainer xmlObjects={this.state.xmlObjectsDisplayed} checkedNfes={this.state.checkedNfes} onSelectNfe={this.handleSelectNfe}></NfesContainer>
        <div className="fixed-bottom bg-primary text-white small p-1">
          {`Peso bruto total: ${this.state.totalWeight.toFixed(2)}kg - Peso bruto selecionado: ${this.state.selectedWeight.toFixed(2)}kg`}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
