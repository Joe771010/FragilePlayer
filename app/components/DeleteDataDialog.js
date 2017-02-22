import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import DatabaseStyles from '../styles/DatabaseStyles'

class DeleteDataDialog extends React.Component {
  render() {
    return (
      <Dialog
        open = {this.props.displayDeleteDataDialog}
        modal = {true}
      >
        <div>
          <text style={DatabaseStyles.deleteText}>確定刪除歌曲?</text>
          <RaisedButton label='確定' onClick={this.props.onDataDeleteClickOk} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
          <RaisedButton label='取消' onClick={this.props.onDataDeleteClickCancel} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
        </div>
      </Dialog>
    )

  }
}

module.exports = DeleteDataDialog
