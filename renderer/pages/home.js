import React, { Component } from "react";
import Head from "next/head";
import * as material from "@material-ui/core";
import axios from "axios";

class GitHub extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			done: false,
		};
	}

	async componentDidMount() {
		const request = await axios.get("https://davidilie.com/api/bg/job/github");
		this.setState({ data: request.data });
		this.setState({ done: true });
	}

	render() {
		return (
			<div>
				<Head>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width"
					/>
				</Head>
				<material.Paper
					elevation={0}
					style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
				>
					<material.AppBar
						color="primary"
						position="static"
						style={{ height: 64 }}
					>
						<material.Toolbar style={{ height: 64 }}>
							<material.Typography color="inherit">
								GitHub Projects
							</material.Typography>
						</material.Toolbar>
					</material.AppBar>
					<material.List>
						{this.state.done === false ? (
							<material.LinearProgress />
						) : (
							this.state.data.map((repository, index) => {
								const { name, url, language } = repository;
								return (
									<material.Tooltip
										onClick={() => navigator.clipboard.writeText(url)}
										title="Copy link"
										aria-label="Copy link"
										placement="right-start"
									>
										<material.ListItem button key={index}>
											<material.ListItemText
												primary={name}
												secondary={language}
											/>
										</material.ListItem>
									</material.Tooltip>
								);
							})
						)}
					</material.List>
				</material.Paper>
			</div>
		);
	}
}

module.exports = GitHub;
