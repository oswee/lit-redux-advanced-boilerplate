import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import store, { getLauncherVisibility } from '../../store';
import '../main-navigation';
import '../main-launcher';
import '../app-signin';

class AppShell extends connect(store)(LitElement) {
	private socket = new WebSocket("ws://localhost:7070/v1/ws/public");
	static get is() {
		return 'app-shell';
	}

	private text: string;
	private launcherIsVisible: boolean;
	private lastUsedApp: string;
	private defaultApp: string;

	static get properties() {
		return {
			text: {
				type: String,
			},
			launcherIsVisible: {
				type: Boolean,
			},
			lastUsedApp: {
				type: String,
			},
			defaultApp: {
				type: String,
			},
		};
	}

	constructor() {
		super();
		this.text = 'App Shell Component';
		this.defaultApp = 'app-signin';
		this.lastUsedApp = 'app-home';
		// this.launcherIsVisible = true
	}

	stateChanged(state) {
		this.launcherIsVisible = getLauncherVisibility(state);
		// console.log(this.launcherIsVisible)
	}

	static get styles() {
		return [
			css`
				:host {
					height: 100vh;
					width: 100vw;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					background-color: var(--color-base-light);
					color: var(--color-dodgerblue-10d);
				}
				main-launcher {
					position: fixed;
					top: var(--size-sl);
				}
			`,
		];
	}

	render() {
		return html`
			<main-navigation></main-navigation>

			${this.launcherIsVisible
				? html`
						<main-launcher></main-launcher>
				  `
				: ''}
			<slot></slot>
		`;
	}

	connectedCallback() {
		super.connectedCallback();
		if (localStorage.getItem('lastUsedApp') !== null) {
			this.lastUsedApp = localStorage.getItem('lastUsedApp');
		}
		console.log("Last Used App:", this.lastUsedApp);
		console.log("Connecting...");
		this.socket.onopen = () => {
			const msg = {
				type: "message",
				body: "Dzintars"
			  };
			this.socket.send(JSON.stringify(msg));
		}
		this.socket.onclose = (event) => {
			console.log("Socket Closed", event);
		}
		this.socket.onerror = (error) => {
			console.log("Socket Error: ", error);
		}
		this.socket.onmessage = (msg) => {
			console.log(msg);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.socket.close();
	}

	// Turn off shadowDOM
	// createRenderRoot() {
	// 	return this;
	// }
}

customElements.define(AppShell.is, AppShell);
