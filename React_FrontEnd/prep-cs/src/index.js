import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Home_Page extends React.Component {

	render() {
		return (
			<div className="homePage">
				<Home_Bar/>
				<Home_Body/>
			</div>
			);
	}
}

class Home_Bar extends React.Component {

	render() {
		return (
			<div className="homeBar">
				<h1>Home Bar</h1>
			</div>
		);
	}
}

class Home_Body extends React.Component {

	render() {
		return (
			<div className="homeBody">
				<h1>Home Body</h1>
			</div>
		);
	}
}

ReactDOM.render(
  <Home_Page />,
  document.getElementById('root')
);
