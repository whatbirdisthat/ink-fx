# usdaud

> This readme is automatically generated by [create-ink-app](https://github.com/vadimdemedes/create-ink-app)


## Install

```bash
$ npm install --global usdaud
```

### Note

The usdaud think needs an API to get the rates. The mocks are set up to pretend to be
ratesapi.io - so you can point the program at ratesapi and it will "just work".

The ratesapi API can be found here:
[Documentation](https://ratesapi.io/documentation/)

(I think)

## CLI

```
$ usdaud --help

  Usage
    $ usdaud 100

  Options
    --dollars The USD to convert to AUD

  Examples
    $ usdaud 100
    72.34
```

## Developing Things

### To make this work without the internet, run the mocks in a separate terminal.

```bash
make run-mocks
```

Then you can send things to Mountebank and have fun with fake responses.

### If you want to just make sure the mocks are all ok

```bash
make mock-smoke-test
```
