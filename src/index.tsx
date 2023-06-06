import React from 'react';
import {createRoot} from 'react-dom/client';
import {Layout} from 'components/Layout';
import App from './app';

import './game.css';
import './index.css';

const element = document.getElementById('root');
const root = createRoot(element!);

root.render(
	<Layout>
		<App word='latte' />
	</Layout>
);
