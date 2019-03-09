import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AceEditor from 'react-ace';
//import brace from 'brace';

import 'brace/mode/python';
import 'brace/theme/solarized_dark';

class Home_Page extends React.Component {

	render() {
		return (
			<div className="homePage">
				{/*
				<Home_Body/>
				*/}
				<Home_Bar />
				<Demo_Problem />
			</div>
		);
	}
}

class Demo_Problem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			code: null,
			codeSubmissionEndpoint: "https://9ypm29b2j3.execute-api.us-east-1.amazonaws.com/prod/submit-code"
		}
		//this.state.codeSubmissionEndpoint = "https://9ypm29b2j3.execute-api.us-east-1.amazonaws.com/prod/submit-code"
	}

	submitCode = () => {
		if (!this.state.code) {
			alert("can't submit. no value");
		} else {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", this.state.codeSubmissionEndpoint, true);

			xhr.onerror = (err) => {
				// TODO(awogbemila): Deal with errors related to network.
			}

			xhr.onload = (res) => {
				const response = JSON.parse(xhr.response);
				const response_json = response["body"];
				console.log(response_json);
			}

			const json_code = {code: this.state.code}
			xhr.send(JSON.stringify(json_code));
		}
	}

	onChange = (newValue) => {
		this.state.code = newValue;
	}


	render() {
		return (
			<div className="demoProblem">
				<div className="problem-desc-container">
					<h1>Two Sum</h1>
					<h3>Given a list of numbers and a value, find all the pairs of numbers
						in the list which sum up to the given value.
				</h3>
				</div>
				<div className="ide-container">
					<AceEditor
						mode="python"
						theme="solarized_dark"
						height="600px"
						width="700px"
						onChange={this.onChange}
					//name="UNIQUE_ID_OF_DIV"
					//editorProps={{$blockScrolling: true}}
					/>
					<div><button onClick={() => this.submitCode()}>Submit</button></div>
				</div>
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
						<a href="#" className="nav-item">
							<span className="nav-link">Demo Problem</span>
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
