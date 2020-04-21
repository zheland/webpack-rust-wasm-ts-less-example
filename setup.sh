#!/bin/bash

set -ex

if ! type "rustup" > /dev/null; then
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
fi
if type "apt" > /dev/null; then
    if ! type "npm" > /dev/null; then
        curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
        sudo apt install -y nodejs
    fi
fi

rustup self update
rustup update
rustup target add wasm32-unknown-unknown
cargo install wasm-pack
cargo install simple-http-server

sudo npm install -g npm@latest

( cd wasm && wasm-pack build --out-name index )
( cd www && npm install )
