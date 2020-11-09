import React, { Component } from "react";
import "./App.css";
import Row from "./components/Row";
import API from "./utils/API";

class App extends Component {
	state = {
		filteredName: "",
		results: [],
		sortAccending: true,
	};

	componentDidMount() {
		this.getEmployeeList("results");
	}

	getEmployeeList = () => {
		API.getEmployees()
		.then((res) => this.setState({ results: res.data.results }))
		.catch((err) => console.log(err));
	};

	render() {
		const filterName = new RegExp(this.state.filteredName, "i");
		return (
			<div className="container">
				<div className="row my-4">
					<div className="col">
						<h1>Employee Directory</h1>
						<form class="input-group">
							<input className="form-control" type="text" placeholder="Search Employee" onChange={(employee) => this.setState((state) => ({ ...state, filteredName: employee.target.value}))}/>
							<div class="input-group-append" id="button-addon4">
								<input className="btn btn-outline-secondary" type="button" onClick={() => !this.setState((state) => ({...state, sortAccending: true}))} value="Accending"/>
								<input className="btn btn-outline-secondary" type="button" onClick={() => !this.setState((state) => ({...state, sortAccending: false}))} value="Decending"/>
							</div>
						</form>
					</div>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Image</th>
							<th scope="col">Phone</th>
							<th scope="col">Email</th>
							<th scope="col">Dob</th>
						</tr>
					</thead>
					<tbody>
						{
						this.state.results.filter((employee) =>
							filterName.test(
								`${employee.name.first} ${employee.name.last}`
							)
						).sort((a, b) => {
							if (this.state.sortAccending) {
								return b.dob.age - a.dob.age;
							} else {
								return a.dob.age - b.dob.age;
							}
						}).map((employee,id) => (
							<Row key={id} {...employee} />
						))
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
