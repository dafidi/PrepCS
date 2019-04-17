import React from 'react';
import AceEditor from 'react-ace';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AuthUserContext, withAuthorization } from '../Session';

import "react-tabs/style/react-tabs.css";
import "brace/theme/solarized_light";

class ProblemDetailBase extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			problemId: null,
			problemName: null,
			problemSummary: null,
			code: "",
			codeSubmissionEndpoint:
				"https://9ypm29b2j3.execute-api.us-east-1.amazonaws.com/prod/submit-code",
			defaultOutputText: "Your code's output.",
			problemTestFilepath: null,
			problemTestFile: null,
			problemStarterCodeFilepath: null,
			problemStarterCode: '',
			// problemSolutionCode: "def reverse_string(string):\n\tstring = string[::-1]\n\treturn string",
			problemSolutionCode: "",
			problemSolutionCodeFilePath: null,
			showSolution: false,
			userId: null,
			width: '1920',
			height: '1080',

		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

		this.infoBoxRef = React.createRef();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	/**
	 * Sends an http request to AWS API Gateway for execution of the users's code.
	 */
	submitCode = () => {
		if (!this.state.code) {
			// TODO(awogbemila): maybe develop and use a custom alert system.
			alert("can't submit. no value");
		} else {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", this.state.codeSubmissionEndpoint, true);

			xhr.onerror = (err) => {
				// TODO(awogbemila): Deal with errors related to network.
			}

			xhr.onload = (res) => {
				const response = JSON.parse(xhr.response);
				const responseJson = JSON.parse(response["body"]);
				this.infoBoxRef.current.updateOutput(responseJson);
				this.evaluateSubmission(responseJson);
			}

			const json_submission = {
				code: this.state.code,
				test: this.state.problemTestFile
			};
			xhr.send(JSON.stringify(json_submission));
		}
	}

	/**
	 * @param {!Object} resultJson (should have "result", "error" and 
	 * "error-status" fields)
	 * TODO (awogbemila): Develop custom Result object in place of JSON.
	 */
	evaluateSubmission = (resultJson) => {
		this.recordLastProblemAttempted(this.state.problemId);
		if (resultJson["error-status"]) {
			// Nothing to do here really except alert the user that there is an error
			// in their code.
		} else {
			this.props.firebase.fs_user(this.props.firebase.getUid()).get()
				.then((doc) => {
					// Record attempt at problem.
					let usersCurrentProblemIdsAttempted = doc.data().problems_attempted;
					if (usersCurrentProblemIdsAttempted.includes(this.state.problemId)) {
						// Nothing to do here really.
					} else {
						usersCurrentProblemIdsAttempted.push(this.state.problemId);
						this.props.firebase.fs_user(this.props.firebase.getUid()).update(
							{
								problems_attempted: usersCurrentProblemIdsAttempted
							}
						)
							.catch((error) => {/** TODO (awogbemila): Deal with errors, sigh.*/ });
					}

					let parsedResult = JSON.parse(resultJson["result"]);

					const num_run = parsedResult["num_run"];
					const num_passed = parsedResult["num_passed"];

					// Record successful attempt at problem.
					if (num_run === num_passed) {
						let problemsUserHasSolved = doc.data().problems_attempted_successfully;
						if (problemsUserHasSolved.includes(this.state.problemId)) {
							// Nothing to do here really.
						} else {
							problemsUserHasSolved.push(this.state.problemId);
							this.props.firebase.fs_user(this.props.firebase.getUid()).update(
								{
									problems_attempted_successfully: problemsUserHasSolved
								})
								.then()
								.catch();
						}
					}
				})
				.catch((error) => {/** TODO (awogbemila): Deal with errors, sigh.*/
				});
		}
	}

	/**
	 * Updates the stored value of the user's code (a string).
	 */
	onTextEditorChange = (newValue) => {
		/**
		 * DO NOT CHANGE THIS LINE!
		 * Otherwise, the editor won't work. I know we shouldn't
		 * set state like this but using setState breaks the site, you can try it
		 * out locally and see. I know the warning in developer console isn't pretty 
		 * but it's what we got. :)
		 */
		this.state.code = newValue;
	}

	componentDidMount = () => {

		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);

		this.props.firebase.auth.onAuthStateChanged((user) => {
			if (user) {
				const { problem_id } = this.props.match.params;

				// Fetch problem information from firebase database.
				this.props.firebase.fs_problems().doc(problem_id).get()
					.then((doc) => {
						const docData = doc.data();
						console.log(docData)

						this.setState({
							problemName: docData.shortName,
							problemSummary: docData.summary,
							problemId: problem_id,
							problemTestFilepath: docData.testFilePath,
							problemStarterCodeFilepath: docData.starterCodeFilePath,
							problemSolutionCodeFilePath: docData.solutionCodeFilePath,
							userId: this.props.firebase.getUid()
						});

						this.recordLastProblemOpened(problem_id);

						this.getStarterCode();
						this.getSolutionCode();
						this.getTestFile();
					})
					.catch();
			} else {

			}
		});
	}

	recordLastProblemOpened = (problemId) => {
		if (problemId && this.state.userId) {
			this.props.firebase.fs_user(this.state.userId)
				.update({ last_problem_opened: problemId })
				.then(() => {
					// Nothing to do really.
				})
				.catch((error) => { console.warn(error) });
		} else {
			// Noting to do really.
		}
	}

	recordLastProblemAttempted = (problemId) => {
		if (problemId && this.state.userId) {
			this.props.firebase.fs_user(this.state.userId)
				.update({ last_problem_attempted: problemId })
				.then(() => {
					console.log("last problem attempted recorded.");
					// Nothing to do really.
				})
				.catch((error) => { console.warn(error) });
		} else {
			console.log("last problem attempted not recorded.");
			// Noting to do really.
		}
	}

	getTestFile = () => {
		// Fetch test file.
		let testFileData = null;
		this.props.firebase.storage_file(this.state.problemTestFilepath)
			.getDownloadURL()
			.then((resourceUrl) => {
				let xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = (event) => {
					let blob = xhr.response;
					let reader = new FileReader();

					reader.onload = () => {
						testFileData = reader.result;
						this.setState({
							problemTestFile: testFileData
						});
					}
					reader.readAsText(blob);
				}
				xhr.open('GET', resourceUrl);
				xhr.send();
			})
			.catch();
	}

	getStarterCode = () => {
		// Fetch starter code file.
		let problemStarterCode = null;
		this.props.firebase.storage_file(this.state.problemStarterCodeFilepath)
			.getDownloadURL()
			.then((resourceUrl) => {
				let xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = (event) => {
					let blob = xhr.response;
					let reader = new FileReader();

					reader.onload = () => {
						problemStarterCode = reader.result;
						this.setState({
							problemStarterCode: problemStarterCode,
							code: problemStarterCode
						});
					}
					reader.readAsText(blob);
				}
				xhr.open('GET', resourceUrl);
				xhr.send();
			})
			.catch();
	}

	getSolutionCode = () => {
		// Fetch starter code file.
		let problemSolutionCode = null;
		this.props.firebase.storage_file(this.state.problemSolutionCodeFilePath)
			.getDownloadURL()
			.then((resourceUrl) => {
				let xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = (event) => {
					let blob = xhr.response;
					let reader = new FileReader();

					reader.onload = () => {
						problemSolutionCode = reader.result;
						this.setState({
							problemSolutionCode: problemSolutionCode,
						});
					}
					reader.readAsText(blob);
				}
				xhr.open('GET', resourceUrl);
				xhr.send();
			})
			.catch();
	}

	render() {
		var Is_Mid_Desktop = this.state.width < 1300;
		var Is_Mobile_View = this.state.width < 700;
		var Total_Page_Width = this.state.width - 17;
		var Total_Page_Height = this.state.height - 95;
		var Test_Card_Width = Total_Page_Width / 2;
		var Test_Card_Height = Total_Page_Height;
		var Test_Card_Height_2 = (Total_Page_Height - 50 - 90) / 2;

		var Test_Card_Width_Mobile = this.state.width;


		Test_Card_Width = "" + Test_Card_Width + "px";
		Test_Card_Height = "" + Test_Card_Height + "px";
		Test_Card_Height_2 = "" + Test_Card_Height_2 + "px";
		Test_Card_Width_Mobile = "" + Test_Card_Width_Mobile + "px";


		return (
			<AuthUserContext.Consumer>
				{authUser =>
					<div className="" style={Is_Mobile_View ? {} : { overflowY: "hidden" }}>

						<div className="" style={Is_Mobile_View ? {} : { float: "left" }}>
							<div className="card text-white bg-success mb-3" style={Is_Mobile_View ? { width: Test_Card_Width_Mobile, marginBottom: "0px" } : { width: Test_Card_Width, height: Test_Card_Height }}>
								<div className="card-header">
									<h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Problem: {this.state.problemName}</h4>
								</div>
								<div className="card-body">
									<div>
										<div className="card border-info mb-3" style={Is_Mobile_View ? { margin: "0px 20px", marginBottom: "20px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" } : { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Test_Card_Height_2, margin: "0px 45px", marginBottom: "20px" }}>
											<div className="card-header" style={{ backgroundColor: "#003a63" }}>
												<h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Problem Description:</h4>
											</div>
											<div className="card-body" style={{ textAlign: "center", color: "#212529" }}>
												<div>
													<h4>{this.state.problemSummary}</h4>
												</div>
											</div>
										</div>
									</div>

									<div className="card border-danger mb-3" style={Is_Mobile_View ? { margin: "0px 20px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" } : { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Test_Card_Height_2, margin: "0px 45px" }}>
										<div className="card-header" style={{ backgroundColor: "#e51937" }}>
											<h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Console:</h4>
										</div>
										<div className="card-body" style={{ color: "#212529" }}>
											<div>
												<InfoBox
													ref={this.infoBoxRef}
													text={this.state.defaultOutputText} />
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>


						<div className="" style={{ float: "right" }}>
							<div className="card text-white bg-warning mb-3" style={Is_Mobile_View ? { width: Test_Card_Width_Mobile } : { width: Test_Card_Width, height: Test_Card_Height }}>
								<div className="card-header">

									<h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Coding Playground: <button onClick={() => { this.setState({showSolution : !this.state.showSolution}) }}>{this.state.showSolution ? "Continue Coding" : "Show Solutions"}</button> </h4>

								</div>
								<div className="card-body" style={{ padding: "0px" }}></div>
								{
									!this.state.showSolution ? <AceEditor
										style={Is_Mobile_View ? { width: Test_Card_Width_Mobile } : { width: Test_Card_Width, height: Test_Card_Height }}
										mode="python"
										theme="solarized_dark"
										fontSize={Is_Mobile_View ? 15 : 25}
										showPrintMargin={false}
										onChange={this.onTextEditorChange}
										value={this.state.code}
										editorProps={{ $blockScrolling: true }}
										wrapEnabled={true}/>
									: <AceEditor
											style={Is_Mobile_View ? { width: Test_Card_Width_Mobile } : { width: Test_Card_Width, height: Test_Card_Height }}
											mode="python"
											theme="solarized_light"
											fontSize={Is_Mobile_View ? 15 : 25}
											showPrintMargin={false}
											onChange={this.onTextEditorChange}
											value={this.state.problemSolutionCode}
											editorProps={{ $blockScrolling: true }}
											wrapEnabled={true}
											readOnly={true}/>
								}
								{/*<div className="submit-button" onClick={() => this.submitCode()}>Submit</div>*/}
								<button onClick={() => this.submitCode()} type="submit" className="btn btn-warning" style={{ fontSize: "1.3rem", height: "50px" }}>
									<strong>Submit Code</strong>
								</button>
							</div>
						</div>
						<div style={{ clear: "both" }}>
						</div>
					</div>
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
		};
	}
	/**
	 * @param {!Object} resultJson (should have "result", "error" and 
	 * "error-status" fields)
	 */
	updateOutput = (resultJson) => {
		if (resultJson["error-status"]) {
			const marker = "\"/tmp/submission.py\",";
			let startOfMarker = resultJson["error"].indexOf(marker);
			const endOfMarker = startOfMarker + marker.length;
			const errorMessage = resultJson["error"].slice(endOfMarker);
			this.setState({
				// resultJson["result"] will itself needed to be parsed as JSON
				// so we have more information about the result of the submission.
				text: resultJson["result"] + "\nError:\n" + errorMessage
			});
		} else {
			let parsedResult = JSON.parse(resultJson["result"]);
			parsedResult = JSON.parse(JSON.stringify(parsedResult));
			const numTestsRun = parsedResult["num_run"]
			const numTestsPassed = parsedResult["num_passed"]
			const inputs = parsedResult["inputs"]
			const outputs = parsedResult["outputs"]
			const passFailByIndex = parsedResult["pass_fail_by_index"]

			let scoreMessage = "Passed " + numTestsPassed + "/" + numTestsRun +
				" Cases.\n";
			if (numTestsRun > numTestsPassed) {
				const indexOfFirstFailure = passFailByIndex.indexOf("FAIL");
				const inp = inputs[indexOfFirstFailure];
				scoreMessage += "Failed test case:\n" +
					"Input: " + JSON.stringify(inp) + "\n" +
					"Your Output:" + JSON.stringify(outputs[indexOfFirstFailure])
			} else if (numTestsRun === numTestsPassed) {
				scoreMessage += "Congratulations you have solved this problem.";
			}

			this.setState({
				text: scoreMessage
			});
		}
	}

	render() {
		return (
			<div className="">
				<Tabs>
					<TabList>
						<Tab>Output</Tab>
						<Tab>Information</Tab>
					</TabList>

					<TabPanel>
						<h4>{this.state.text}</h4>
					</TabPanel>
					<TabPanel>
						<h4>Further information about this problem.</h4>
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
