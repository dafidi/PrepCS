import React from 'react';
import ReactDOM from 'react-dom';
import Firebase, { FirebaseContext } from './Firebase';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<Router>
			<App />
		</Router>
	</FirebaseContext.Provider>,
	document.getElementById('root')
);
