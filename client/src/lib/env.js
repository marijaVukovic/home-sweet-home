const { REACT_APP_API_PROTOCOL, REACT_APP_API_HOSTNAME, REACT_APP_API_PORT } = process.env;

// mapping empty hostname to localhost
const hostname = !REACT_APP_API_HOSTNAME
  ? 'localhost'
  : REACT_APP_API_HOSTNAME;

export default {
  API_URL: `${REACT_APP_API_PROTOCOL}://${hostname}${REACT_APP_API_PORT ? `:${REACT_APP_API_PORT}` : ''}`,
};
