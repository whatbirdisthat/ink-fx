import React, {FC, useEffect, useState} from 'react';
import {Newline, Text} from 'ink';
import {Currency} from './lib/fx';
import fetch from 'node-fetch';

const App: FC<{ dollars?: number }> = ({dollars = 1}) => {
	const [fxRate, setFxRate] = useState(0);

	const fetchThings = async () => {

		const RATESAPI_FAKE: boolean = process.env.FAKE_RATESAPI === '1';
		console.log(`FAKE_RATESAPI='${process.env.FAKE_RATESAPI}'`);
		console.log(`RATESAPI_FAKE='${RATESAPI_FAKE}'`);
		let RATESAPI_SERVER: string = RATESAPI_FAKE ? 'http://localhost:4545' : 'https://api.ratesapi.io';
		// const response = await fetch("https://api.ratesapi.io/api/latest?base=USD&symbols=AUD");
		// const response = await fetch('http://localhost:4545/api/latest?base=USD&symbols=AUD');
		const response = await fetch(`${RATESAPI_SERVER}/api/latest?base=USD&symbols=AUD`);
		const responseObject = await response.json();
		setFxRate(responseObject.rates.AUD);
	};

	useEffect(() => {
		void fetchThings();
	}, []);

	return (
		<Text>
			<Text>
				USD: <Text color="green"><Currency dollars={dollars}/></Text>
			</Text>
			<Newline/>
			<Text>
				AUD: <Text color="green"><Currency dollars={dollars * fxRate}/></Text>
			</Text>
			<Newline/>
			<Text>Rate: </Text>
			<Text color="blue">{fxRate}</Text>
		</Text>
	);
};

module.exports = App;
export default App;

