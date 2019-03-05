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
				<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
					<a href="#">
						<span className="navbar-brand">Howard: PrepCS</span>
					</a>
					<div className="navbar-nav mr-auto">
						<a href="#" className="nav-item">
							<span className="nav-link">Problems</span>
						</a>
					</div>
					<form className="form-inline my-2 my-lg-0">
						<button className="btn btn-secondary my-2 my-sm-0" type="submit">Logout</button>
					</form>
				</nav>
			</div>
		);
	}
}

class Home_Body extends React.Component {

	render() {
		return (
			<div className="homeBody">
				<div className="jumbotron">
					<h1 className="display-3">Welcome to PrepCS!</h1>
					<p className="lead">PrepCS is web service aimed at providing Computer Science students at Howard University a personalized career development platform on 3 major fronts:</p>
					<hr className="my-4"></hr>
					<div className="list-group">
						<a href="#" style={{color: "white", backgroundColor: "#F3969A"}} className="list-group-item list-group-item-action flex-column align-items-start">
          					<div className="d-flex w-100 justify-content-between">
            					<h5 className="mb-1">Coding Interview Readiness</h5>
          					</div>
          					<p className="mb-1">Prepares you for Technical and Behavioral Interviews.</p>
        				</a>
						<a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
          					<div className="d-flex w-100 justify-content-between">
            					<h5 className="mb-1">Resume Building</h5>
          					</div>
          					<p className="mb-1">Stand out from the crowd and your fellow peers.</p>
        				</a>
						<a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
            				<div className="d-flex w-100 justify-content-between">
              					<h5 className="mb-1">CS-Related Event Tracking</h5>
            				</div>
            				<p className="mb-1">Always be in the know to further your career goals.</p>
        				</a>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
  <Home_Page />,
  document.getElementById('root')
);
