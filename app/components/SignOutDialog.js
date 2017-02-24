import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import DatabaseStyles from '../styles/DatabaseStyles'

class SignOutDialog extends React.Component {
  render() {
    return (
      <Dialog
        open = {this.props.displaySignOutDialog}
        modal = {true}
      >
        <div>
          <text style={DatabaseStyles.deleteText}>確定登出 ( {this.props.userEmail} )?</text>
          <RaisedButton label='確定' onClick={this.props.onSignOutClickOk} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
          <RaisedButton label='取消' onClick={this.props.onSignOutClickCancel} labelStyle={DatabaseStyles.buttonText} style={DatabaseStyles.buttonStyle}/>
        </div>
      </Dialog>
    )

  }
}

module.exports = SignOutDialog
