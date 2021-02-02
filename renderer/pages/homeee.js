import React, { Component } from "react";
import Head from "next/head";
import * as material from "@material-ui/core";
import axios from "axios";

const { shell } = require("electron");

class GitHub extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			done: false,
			darkMode: false,
			setDarkMode: false,
		};
	}

	async componentDidMount() {
		const request = await axios.get("https://davidilie.com/api/bg/job/github");
		this.setState({ data: request.data });
		this.setState({ done: true });
	}

	render() {
		const theme = material.createMuiTheme({
			palette: {
				type: this.state.darkMode ? "dark" : "light",
			},
		});
		return (
			<material.ThemeProvider theme={theme} style={{ height: "100vh" }}>
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
				<material.Paper style={{ height: "97vh" }}>
					<material.AppBar
						color="primary"
						position="static"
						style={{ height: 64 }}
					>
						<material.Toolbar>
							<material.Typography color="inherit">
								GitHub Projects
							</material.Typography>
							<material.FormControlLabel
								style={{ marginLeft: "2%" }}
								control={
									<material.Switch
										checked={this.state.darkMode}
										onChange={() =>
											this.setState({ darkMode: !this.state.darkMode })
										}
									/>
								}
								label="Dark Mode"
							/>
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
										onClick={() => shell.openExternal(url)}
										title="Open Link"
										aria-label="Open Link"
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
			</material.ThemeProvider>
		);
	}
}

module.exports = GitHub;
