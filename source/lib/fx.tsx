import React, {FC} from 'react';
import {Text} from 'ink';

export const usdaud = (): number => {
	// http://localhost:4545/api/latest?base=USD&symbols=AUD
	return ratesApi.rates.AUD;
};

const ratesApi = {base: 'USD', rates: {AUD: 1.3908435778}, date: '2020-10-09'};

export const Currency: FC<{ dollars: number }> = ({dollars = 0}) => (
	<Text color="blueBright">${dollars.toFixed(2)}</Text>
);

