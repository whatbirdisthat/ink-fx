#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './ui';

const cli = meow(`
	Usage
	  $ usdaud

	Options
		--name  Your name

	Examples
	  $ usdaud --name=Jane
	  Hello, Jane
`, {
	flags: {
		dollars: {
			type: 'number',
			alias: 'd'
		}
	}
});

render(<App dollars={cli.flags.dollars ?? Number.parseFloat(cli.input[0])}/>);
