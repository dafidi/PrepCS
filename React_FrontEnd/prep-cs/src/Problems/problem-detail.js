import React from 'react';
import AceEditor from 'react-ace';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AuthUserContext, withAuthorization } from '../Session';

import "react-tabs/style/react-tabs.css";

class ProblemDetailBase extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			problemName: null,
			problemSummary: null,
			code: null,
			codeSubmissionEndpoint:
				"https://9ypm29b2j3.execute-api.us-east-1.amazonaws.com/prod/submit-code",
			outputText: "Your code's output."
		};

		this.infoBoxRef = React.createRef();
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
				this.infoBoxRef.current.updateText(JSON.parse(response_json));
			}

			const json_code = { code: this.state.code }
			xhr.send(JSON.stringify(json_code));
		}
	}

	onChange = (newValue) => {
		this.state.code = newValue;
	}

	componentDidMount = () => {
		const { problem_id } = this.props.match.params;

		this.props.firebase.fs_problems().doc(problem_id).get()
		.then((doc) => {
			const docData = doc.data();
			this.setState({
				problemName: docData.shortName,
				problemSummary: docData.summary 
			});
		})
		.catch();
	}

	render() {
		return (
			<AuthUserContext.Consumer>
				{authUser =>
					<span className="demoProblem">
						<span className="problem-desc-container">
							<h1>{this.state.problemName}</h1>
							<h3>{this.state.problemSummary}</h3>
							<InfoBox
								ref={this.infoBoxRef}
								text={this.state.outputText} />
						</span>
						<div className="ide-container">
							<AceEditor
								mode="python"
								theme="solarized_dark"
								// height="100%"
								// width="100%"
								width="100%"
								height="600px"
								onChange={this.onChange}
							//name="UNIQUE_ID_OF_DIV"
							//editorProps={{$blockScrolling: true}}
							/>
							<div className="submit-button" onClick={() => this.submitCode()}>Submit</div>
						</div>
					</span>
				}
			</AuthUserContext.Consumer>
		);
	}
}

class InfoBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: this.props.text
		}
	}
	/**
	 * @param {!Object} resultJson (should have "result", "error" and 
	 * "error-status" fields)
	 */
	updateText = (resultJson) => {
		this.setState({
			text: resultJson["result"]
		});
	}

	render() {
		return (
			<div className="info-box">
				<Tabs>
					<TabList>
						<Tab>Output</Tab>
						<Tab>Information</Tab>
					</TabList>

					<TabPanel>
						<h2>{this.state.text}</h2>
					</TabPanel>
					<TabPanel>
						<h2>Other information that we'll put here.</h2>
					</TabPanel>
				</Tabs>
			</div>
		);
	}
}

const ProblemDetail = compose(
	withRouter,
	withFirebase
)(ProblemDetailBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProblemDetail);
