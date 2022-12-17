extern crate proc_macro;

use proc_macro::TokenStream;
use quote::quote;
use syn;

// * proc_macro crate 是编译器用来读取和操作我们 Rust 代码的 API。
// * syn crate 将字符串中的 Rust 代码解析成为一个可以操作的数据结构。
// * quote 则将 syn 解析的数据结构转换回 Rust 代码

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
  let ast = syn::parse(input).unwrap();
  impl_hello_macro(&ast)
}

fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
  let name = &ast.ident;
  let gen = quote! {
    impl HelloMacro for #name {
      fn hello_macro() {
        println!("Hello, Macro! My name is {}!", stringify!(#name));
      }
    }
  };
  gen.into()
}
