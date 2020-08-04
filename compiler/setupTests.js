const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('jsdom-global/register');

configure({ adapter: new Adapter() });

global.___loader = {
    enqueue: jest.fn(),
  }
