import React, { PureComponent } from 'react';
import { Form, Button, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { authActions, authSelectors } from '../../store';
import Routes from '../../lib/routes';

class SignIn extends PureComponent {
  propTypes = {
    login: PropTypes.func,
    authUser: PropTypes.object,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  render() {
    if (this.props.authUser) {
      return <Redirect to={Routes.Guests} />;
    }
    const { error } = this.props;

    return (
      <Card className='sign-in-container'>
        <Form onSubmit={this.handleSubmit}>
          <h1 className='sign-in-title'>Sign In</h1>
          <Form.Group widths={2}>
            <Form.Input
              name='email'
              fluid
              required
              label='email'
              placeholder='email'
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <Form.Input
              name='password'
              type='password'
              fluid
              required
              label='Password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <div className='error-status'>{error}</div>
          <Button size='large' className='primary-submit-btn'>Login</Button>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  authUser: authSelectors.getAuthUser(state),
  error: authSelectors.getAuthError(state),
  isLoginInProgress: authSelectors.getAuthInProgress(state),
});

const mapDispatchToProps = dispatch => ({
  login: auth => dispatch(authActions.login(auth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
