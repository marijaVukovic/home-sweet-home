import React, { PureComponent } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { specs } from '../../lib/constants';
import { guestActions, guestSelectors } from '../../store';

const initialFormState = {
  firstName: '',
  lastName: '',
  documentType: 'Passport',
  documentId: '',
  age: '',
  phone: '',
  roomType: '',
};

class CheckInForm extends PureComponent {
  propTypes = {
    error: PropTypes.string,
    isCheckInInProgress: PropTypes.bool,
    onSuccess: PropTypes.func,
    checkInGuest: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { ...initialFormState };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { error, isCheckInInProgress, onSuccess } = this.props;
    if (prevProps.isCheckInInProgress && !isCheckInInProgress && !error) {
      this.setState({
        ...initialFormState,
      });
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  }

  handleDropdownChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.checkInGuest(this.state);
    event.preventDefault();
  }

  render() {
    const { error, isCheckInInProgress } = this.props;
    return (
      <Form
        className='check-in-form'
        onSubmit={this.handleSubmit}
        loading={isCheckInInProgress}
      >
        <Form.Group widths={2}>
          <Form.Input
            name='firstName'
            fluid required
            label='First name'
            placeholder='First name'
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
          <Form.Input
            name='lastName'
            fluid required
            label='Last name'
            placeholder='Last name'
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group widths={3}>
          <Form.Select
            name='documentType'
            id='check-in-documentation'
            fluid required selection
            label='Document'
            placeholder='Document'
            options={specs.documentation}
            value={this.state.documentType}
            onChange={this.handleDropdownChange}
          />
          <Form.Input
            name='documentId'
            fluid required
            label={`${this.state.documentType} number`}
            placeholder='Document number'
            value={this.state.documentId}
            onChange={this.handleInputChange}
          />
          <Form.Input
            name='age'
            fluid
            label='Age'
            placeholder='Age'
            value={this.state.age}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            name='phone'
            fluid
            label='Phone'
            placeholder='+123 45 123 123'
            value={this.state.phone}
            onChange={this.handleInputChange}
          />
          <Form.Select
            name='roomType'
            fluid required selection
            label='Type of the room'
            placeholder='Type of the room'
            options={specs.roomTypes}
            value={this.state.roomType}
            onChange={this.handleDropdownChange}
          />
        </Form.Group>
        <div className='error-status'>{error}</div>
        <Grid.Column className='check-in-btn-wrapper'>
          <Button
            className='primary-submit-btn'
          >
            Check in
          </Button>
        </Grid.Column>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  error: guestSelectors.getGuestsError(state),
  isCheckInInProgress: guestSelectors.getIsCheckInInProgress(state),
});

const mapDispatchToProps = dispatch => ({
  checkInGuest: guest => dispatch(guestActions.checkInGuest(guest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckInForm);
