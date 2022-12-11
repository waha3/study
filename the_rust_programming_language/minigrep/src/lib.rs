use std::env;
use std::error::Error;
use std::fs;

pub struct Config {
  query: String,
  filename: String,
  case_sensitive: bool,
}

impl Config {
  pub fn new(mut args: env::Args) -> Result<Config, &'static str> {
    if args.len() < 3 {
      return Err("不能小于3");
    }
    args.next();

    let query = match args.next() {
      Some(v) => v,
      None => return Err("Didn't get a query string"),
    };

    let filename = match args.next() {
      Some(v) => v,
      None => return Err("Didn't get a file name"),
    };
    let case_sensitive = env::var("CASE_INSENSITIVE").is_err();

    return Ok(Config {
      query,
      filename,
      case_sensitive,
    });
  }
}

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
  let contents = fs::read_to_string(config.filename)?;

  // for line in search(&config.query, &contents) {
  //   println!("line is {}", line);
  // }

  let results = if config.case_sensitive {
    search(&config.query, &contents)
  } else {
    search_case_insensitive(&config.query, &contents)
  };

  for line in results {
    println!("line is {}", line);
  }
  Ok(())
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn one_result() {
    let query = "duct";
    let contents = "\
    Rust:
    safe, fast, productive.
    Pick three.
    ";
    assert_eq!(vec!["safe, fast, productive."], search(query, contents))
  }

  #[test]
  fn case_sensitive() {
    let query = "duct";
    let contents = "\
    Rust:
    safe, fast, productive.
    Pick three.
    ";
    assert_eq!(vec!["safe, fast, productive."], search(query, contents))
  }

  #[test]
  fn case_insensitive() {
    let query = "rUsT";
    let contents = "\
    Rust:
    safe, fast, productive.
    Pick three.
    Trust me.";

    assert_eq!(
      vec!["Rust:", "Trust me."],
      search_case_insensitive(query, contents)
    );
  }
}

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
  // let mut results = Vec::new();
  // for line in contents.lines() {
  //   if line.contains(query) {
  //     results.push(line.trim());
  //   }
  // }
  // results

  contents
    .lines()
    .filter(|line| line.trim().contains(query))
    .collect()
}

pub fn search_case_insensitive<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
  // let query = query.to_lowercase();
  // let mut results = Vec::new();
  // for line in contents.lines() {
  //   if line.to_lowercase().contains(&query) {
  //     results.push(line.trim());
  //   }
  // }
  // results
  contents
    .lines()
    .filter(|line| line.to_lowercase().trim().contains(query))
    .collect()
}
