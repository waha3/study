use std::fs;
use std::io::Read;
use std::io::Write;
use std::net::TcpListener;
use std::net::TcpStream;
use web_server::ThreadPool;

fn main() {
  let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
  let pool = ThreadPool::new(4);
  for stream in listener.incoming() {
    let stream = stream.unwrap();
    println!("Connection established!");
    pool.excute(|| {
      handle_connection(stream);
    })
  }
  println!("Shutting down.");
}

fn handle_connection(mut stream: TcpStream) {
  let mut buffer = [0; 1024];
  stream.read(&mut buffer).unwrap();
  // println!("request {}", String::from_utf8_lossy(&buffer[..]));

  let get = b"GET / HTTP/1.1\r\n";

  let (status_line, filename) = if buffer.starts_with(get) {
    ("HTTP/1.1 200 OK", "index.html")
  } else {
    ("HTTP/1.1 404 NOT FOUND", "404.html")
  };

  let contents = fs::read_to_string(filename).unwrap();
  let response = format!(
    "{}\r\nContent-Length: {}\r\n\r\n{}",
    status_line,
    contents.len(),
    contents
  );
  stream.write(response.as_bytes()).unwrap();
  stream.flush().unwrap();
}

// ! 线程池（thread pool）是一组预先分配的等待或准备处理任务的线程
