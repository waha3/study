use std::env;
use std::fs;

fn main() {
  let args: Vec<String> = env::args().collect();
  // println!("args is {:?}", args);

  // let query = &args[1];
  // let filename = &args[2];

  // println!("query is {}, filename is {}", query, filename);

  // let contents = fs::read_to_string("poem.txt").expect("some wrong has happened");

  // println!("contents is {}", contents);
}

fn parse_config(args: &[String]) -> (&str, &str) {

}
