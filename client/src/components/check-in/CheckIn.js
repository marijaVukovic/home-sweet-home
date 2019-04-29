import React, { PureComponent } from 'react';
import { Card, Modal } from 'semantic-ui-react';

import CheckInForm from './CheckInForm';

class CheckIn extends PureComponent {
  state = {
    isSuccessModalVisible: false,
  }

  render() {
    const { isSuccessModalVisible } = this.state;
    return (
      <Card id='check-in-wrapper'>
        <h1 className='check-in-title'>
          Home Sweet Home
        </h1>
        <h2 className='check-in-subtitle'>
          Welcome
        </h2>
        <h3 className='check-in-paragraph'>
          Please check-in by filling the next form:
        </h3>
        <CheckInForm onSuccess={() => this.setState({ isSuccessModalVisible: true })} />
        <Modal
          size='small'
          open={isSuccessModalVisible}
          onClose={() => this.setState({ isSuccessModalVisible: false })}
        >
          <Modal.Header className='check-in-paragraph'>
            Home Sweet Home
          </Modal.Header>
          <Modal.Content>Enjoy your stay.</Modal.Content>
        </Modal>
      </Card>
    );
  }
}

export default CheckIn;
