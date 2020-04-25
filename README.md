# Web application template with Webpack, Rust-generated WASM, TypeScript and LESS

## About

This template is designed for creating Web applications with Webpack,
Rust-generated WebAssembly, TypeScript and Less with minified class selectors.

Based on [rust-webpack-template](https://github.com/rustwasm/rust-webpack-template).
Differences:
* Wasm and WebPack files are contained in different folders to avoid conflicts in file names.
* JavaScript compiled from TypeScript.
* CSS compiled from LESS and compressed with [clean-css](https://github.com/jakubpawlowicz/clean-css)
* CSS selectors are minified/uglified with [rename-css-selectors](https://github.com/JPeer264/node-rename-css-selectors).

## Setup

### On *nix:

Run `bash setup.sh` to install rust and npm,
build wasm package for npm and initialize npm package.

### On Windows:

* Install rust and npm.
* Run `cd wasm && wasm-pack build --out-name index`
* Run `cd www && npm install`

## Usage

* `cd www && npm run build` to build application in production mode to `www/dist`.
* `cd www && npm run host` to locally host application from `www/dist`
  with [Simple-http-server](https://github.com/TheWaWaR/simple-http-server).
* `cd www && npm run debug` to run webpack-dev-server with application in development mode.
* `cd www && npm run test` to run application node and browser tests.

## Troubleshooting

* `npm install` failed with `Could not install from "../wasm/pkg"
  as it does not contain a package.json file`.

  This happened because `wasm-pack build` failed or
  had not beed called before `npm install` was called.

* ``Error importing `index.ts`: TypeError: "Response has unsupported MIME type"``
  in browser console when hosting `/www/dist/`.

  Some http servers incorrectly recognize wasm file MIME types.
  [Simple-http-server](https://github.com/TheWaWaR/simple-http-server) does it right.

## License

Licensed under either of

* Apache License, Version 2.0,
  ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
* MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license,
shall be dual licensed as above, without any
additional terms or conditions.
