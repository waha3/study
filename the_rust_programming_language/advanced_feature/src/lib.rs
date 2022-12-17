// use proc_macro;
use std::slice;

// pub fn spilt_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
//   let length = slice.len();
//   assert!(length >= mid);
//   (&mut slice[..mid], &mut slice[mid..])
// }

pub fn spilt_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
  let length = slice.len();
  let ptr = slice.as_mut_ptr();
  assert!(length >= mid);
  unsafe {
    (
      slice::from_raw_parts_mut(ptr, mid),
      slice::from_raw_parts_mut(ptr.add(mid), length - mid),
    )
  }
}

// #[some_attribute]
// pub fn some_name(input: TokenStream) -> TokenStream {}
