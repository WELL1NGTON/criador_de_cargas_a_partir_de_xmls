import React, { Component } from 'react';
import NfeMainInfo from './nfeMainInfo';

class NfesContainer extends Component {
  render() {
    return (
      <div className="p-1">
        {this.props.xmlObjects.map((xmlObject) => (
          <NfeMainInfo
            key={xmlObject.nfeProc.NFe.infNFe.ide.nNF}
            xmlObject={xmlObject}
            isChecked={this.props.checkedNfes.includes(xmlObject.nfeProc.NFe.infNFe.ide.nNF)}
            onSelectNfe={this.props.onSelectNfe}
          ></NfeMainInfo>
        ))}
      </div>
    );
  }
}

export default NfesContainer;
