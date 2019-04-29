import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { guestActions, guestSelectors } from '../../store';

class Dashboard extends Component {
  propTypes = {
    getGuests: PropTypes.func,
    checkOutGuest: PropTypes.func,
    error: PropTypes.string,
    checkingOutIds: PropTypes.object,
    guests: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }

  componentDidMount() {
    this.props.getGuests();
  }

  handleCheckOutGuest(id) {
    this.props.checkOutGuest(id);
  }

  render() {
    const { error, checkingOutIds, guests } = this.props;
    return (
      <div className='dashboard-container'>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Guest full name</Table.HeaderCell>
              <Table.HeaderCell>Check-in date</Table.HeaderCell>
              <Table.HeaderCell>Type of document</Table.HeaderCell>
              <Table.HeaderCell>Document number</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Type of room</Table.HeaderCell>
              <Table.HeaderCell>Check-out guest</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {guests.map(guest => <Table.Row key={guest._id}>
              <Table.Cell>{`${guest.firstName} ${guest.lastName}`}</Table.Cell>
              <Table.Cell>{moment(guest.checkInDate).fromNow()}</Table.Cell>
              <Table.Cell>{guest.documentType}</Table.Cell>
              <Table.Cell>{guest.documentId}</Table.Cell>
              <Table.Cell>{guest.age}</Table.Cell>
              <Table.Cell>{guest.phone}</Table.Cell>
              <Table.Cell>{guest.roomType}</Table.Cell>
              <Table.Cell>
                <Button
                  loading={checkingOutIds.has(guest._id)}
                  disabled={checkingOutIds.size > 0}
                  className='check-out-btn'
                  onClick={() => this.handleCheckOutGuest(guest._id)}
                >
                    Check-out
                </Button>
              </Table.Cell>
            </Table.Row>)}
          </Table.Body>
        </Table>
        <div className='error-status'>{error}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: guestSelectors.getGuestsError(state),
  checkingOutIds: guestSelectors.getCheckingOutIds(state),
  guests: guestSelectors.getGuests(state),
});

const mapDispatchToProps = dispatch => ({
  checkOutGuest: _id => dispatch(guestActions.checkOutGuest(_id)),
  getGuests: () => dispatch(guestActions.getGuests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
