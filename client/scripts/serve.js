const { execSync } = require('child_process');

const PORT = process.env.REACT_APP_PORT || 8080;
// eslint-disable-next-line no-console
console.log(`App running on port: ${PORT}`);
execSync(`serve -l ${PORT} -s build`);
