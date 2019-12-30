import "./css/style.scss";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Home } from './components/Home';

ReactDOM.render(<Home name="Max" age={22} />, document.getElementById("root"));
