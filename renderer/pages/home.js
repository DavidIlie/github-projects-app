import React, { Component } from "react";
import Head from "next/head";
import * as material from "@material-ui/core";
import axios from "axios";

const { shell } = require("electron");

class GitHub extends Component {
	constructor() {
		super();
		this.state = {
			inputted: false,
			darkMode: false,
			open: false,
			username: "",
			done: false,
			pending: false,
			data: [],
		};
	}

	render() {
		const theme = material.createMuiTheme({
			palette: {
				type: this.state.darkMode ? "dark" : "light",
			},
		});

		const handleClickOpen = () => {
			this.setState({ open: true });
		};

		const handleClose = async () => {
			this.setState({ open: false });

			if (this.state.username !== "") {
				this.setState({ inputted: true });
				this.setState({ done: false });
				this.setState({ pending: true });
				const request = await axios.get(
					`https://api.github.com/users/${this.state.username}/repos`
				);
				const data = request.data;
				const final = [];
				for (let i = 0; i < data.length; i++) {
					if (data[i].name !== this.state.username) {
						final.push({
							name: data[i].name,
							url: data[i].html_url,
							language: data[i].language,
						});
					}
				}
				this.setState({ data: final });
				this.setState({ done: true });
			}
		};

		const setTextState = (event) => {
			this.setState({ username: event.target.value });
		};

		return (
			<material.ThemeProvider theme={theme}>
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
				<material.Paper style={{ height: "100%" }}>
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
						{this.state.inputted === false ? (
							<div>
								<material.Button onClick={handleClickOpen}>
									Please input github username
								</material.Button>
								<material.Dialog
									open={this.state.open}
									onClose={handleClose}
									aria-labelledby="form-dialog-title"
								>
									<material.DialogTitle id="form-dialog-title">
										Enter Username
									</material.DialogTitle>
									<material.DialogContent>
										<material.DialogContentText>
											To be able to get your GitHub projects in this list. You
											will need to put your GitHub username below. Granted this
											will only fetch your public repositoies!
										</material.DialogContentText>
										<material.TextField
											onChange={setTextState}
											autoFocus
											margin="dense"
											id="username"
											label="GitHub Username"
											type="username"
											fullWidth
										/>
									</material.DialogContent>
									<material.DialogActions>
										<material.Button onClick={handleClose} color="primary">
											Cancel
										</material.Button>
										<material.Button onClick={handleClose} color="primary">
											Finish
										</material.Button>
									</material.DialogActions>
								</material.Dialog>
							</div>
						) : null}
						{this.state.done === false ? (
							<div>
								{this.state.pending === true ? (
									<material.LinearProgress />
								) : null}
							</div>
						) : (
							<div>
								{" "}
								{this.state.data.map((repository, index) => {
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
								})}
								<material.Button
									onClick={() => {
										window.location.reload(false);
									}}
								>
									Restart
								</material.Button>
							</div>
						)}
					</material.List>
				</material.Paper>
			</material.ThemeProvider>
		);
	}
}

module.exports = GitHub;
