#![cfg(target_arch = "wasm32")]

use wasm_bindgen_test::wasm_bindgen_test;

#[wasm_bindgen_test]
fn web_test() {
    assert_eq!(1, 1);
}
