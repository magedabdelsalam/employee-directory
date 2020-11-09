import React from "react";
import "./style.css";

export default function Row(props) {
	return (  
		<tr>
			<td>{props.name.first} {props.name.last}</td>
			<td><img src={props.picture.thumbnail} alt={props.name.first + props.name.last}/></td>
			<td>{props.phone}</td>
			<td>{props.email}</td>
			<td>{props.dob.date}</td>
		</tr>
	);
}
