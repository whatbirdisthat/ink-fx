import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import {render} from 'ink-testing-library';
import App from './ui';

test('Convert one Dollar using rate of 1.305', t => {
	const {lastFrame} = render(<App/>);

	t.is(lastFrame(), chalk`USD: $1.00\n{green AUD:} {gray $1.39}\nRate: {blue 1.3908435778}`);
});

test('Convert $100 using rate of 1.305', t => {
	const {lastFrame} = render(<App dollars={100}/>);

	t.is(lastFrame(), chalk`USD: $100.00\n{green AUD:} {gray $139.08}\nRate: {blue 1.3908435778}`);
});

test('Convert $29.95 using rate of 1.305', t => {
	const {lastFrame} = render(<App dollars={29.95}/>);

	t.is(lastFrame(), chalk`USD: $29.95\n{green AUD:} {gray $41.66}\nRate: {red 1.3908435778}`);
});
