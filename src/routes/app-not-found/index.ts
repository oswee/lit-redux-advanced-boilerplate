import { customElement, html, css } from 'lit-element';
import { AppShell } from '../../containers/app-shell';
import GlobalStyle from '../../assets/global-style';
import Style from './style';

@customElement('app-not-found')
class AppNotFound extends AppShell {
	public static styles = [GlobalStyle, Style];

	protected render() {
		return html`
			<h1>404 : Not Found</h1>
			<a href="/">Go to the main page</a>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
	  'app-not-found': AppNotFound;
	}
}