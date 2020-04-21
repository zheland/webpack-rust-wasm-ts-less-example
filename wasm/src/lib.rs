#![deny(unreachable_patterns, clippy::correctness)]
#![warn(
    anonymous_parameters,
    bare_trait_objects,
    dead_code,
    elided_lifetimes_in_paths,
    missing_copy_implementations,
    missing_debug_implementations,
    trivial_casts,
    trivial_numeric_casts,
    unreachable_pub,
    unused_extern_crates,
    unused_imports,
    unused_import_braces,
    unused_qualifications,
    variant_size_differences,
    clippy::style,
    clippy::complexity,
    clippy::perf,
    clippy::pedantic,
    clippy::nursery,
    clippy::cargo
)]

use wasm_bindgen::prelude::wasm_bindgen;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc<'_> = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(raw_module = "../../www/ts/js-log.ts")]
extern "C" {
    fn log(_: &str);
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn init() {
    #[cfg(feature = "console_error_panic_hook")]
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hi!");
    log("Hi!");
}
