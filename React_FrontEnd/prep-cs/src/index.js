import React from 'react';
import ReactDOM from 'react-dom';
import Demo_Problem from './demo_problem';

import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink,
	Switch,
	Redirect
} from 'react-router-dom';

import './index.css';

import 'brace/mode/python';
import 'brace/theme/solarized_dark';

class Home_Page extends React.Component {

	render() {
		return (
			<Router>
				<div className="homePage">
					{/*
				<Home_Body/>
				*/}
					<Home_Bar />
					{/* <Demo_Problem /> */}
					<Route path="/problems" component={ProblemsComponent}></Route>
					<Route path="/demo-problem" component={Demo_Problem}></Route>
				</div>
			</Router>
		);
	}
}

class ProblemsComponent extends React.Component {
	render() {
		return (
			<div><h3>Problems Page. List of Problems is shown here.</h3></div>
		)
	}
}



class Home_Bar extends React.Component {

	render() {
		return (
			<div className="homeBar">
				<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
					<span className="Nav_link">
						<NavLink to="/"
							style={{color: 'black'}}>
							PrepCS
						</NavLink>
					</span>
					<div className="navbar-nav mr-auto">
						<span className="Nav_link">
							<NavLink to="/problems" 
								style={{color: 'black'}}
								activeStyle={{color: 'yellow'}}>
								Problems
							</NavLink>
						</span>
						<span className="Nav_link" >
							<NavLink to="/demo-problem" 
								style={{color: 'black'}}
								activeStyle={{color: 'yellow'}}>
								Demo Problem
						</NavLink>
						</span>
					</div>
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
						<a href="#" style={{ color: "white", backgroundColor: "#F3969A" }} className="list-group-item list-group-item-action flex-column align-items-start">
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
/*
def two_sum(l, t):
    length = len(l)
    ans = []
    
    for i in range(1, length):
        for j in range(i+1, length):
            if l[i] + l[j] == t:
                ans.append((l[i], l[j]))
                
    return ans
    
def main():
    l = [1, 2, 3, 4, 5]
    t = 5
    
    ans = two_sum(l, t)
    print(ans)
    
if __name__ == "__main__":
    main()

*/
ReactDOM.render(
	<Home_Page />,
	document.getElementById('root')
);
