use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
  // ! 使用线程同时运行代码
  // * 在大部分现代操作系统中，已执行程序的代码在一个 进程（process）中运行，操作系统则负责管理多个进程。
  // * 在程序内部，也可以拥有多个同时运行的独立部分。运行这些独立部分的功能被称为 线程（threads）

  // ! 使用 spawn 创建新线程
  // thread::spawn(|| {
  //   for i in 1..10 {
  //     println!("{} from spawn thread", i);
  //     thread::sleep(Duration::from_millis(10));
  //   }
  // });

  // for i in 1..5 {
  //   println!("{} from main thread", i);
  //   thread::sleep(Duration::from_millis(10));
  // }

  // ! 使用 join 等待所有线程结束
  // * 会阻塞当前线程直到 handle 所代表的线程结束。阻塞（Blocking） 线程意味着阻止该线程执行工作或退出
  // let handle = thread::spawn(|| {
  //   for i in 1..10 {
  //     println!("{} from spawn thread", i);
  //     thread::sleep(Duration::from_millis(10));
  //   }
  // });

  // handle.join().unwrap();

  // for i in 1..10 {
  //   println!("{} from main thread", i);
  //   thread::sleep(Duration::from_millis(10));
  // }

  // handle.join().unwrap();

  // ! 线程与 move 闭包
  // let v = vec![1, 2, 3];
  // let handle = thread::spawn(|| {
  //   println!("v is {:?}", v);
  // });
  // drop(v);
  // handle.join().unwrap();

  // let v = vec![1, 2, 3];
  // let handle = thread::spawn(move || {
  //   println!("v is {:?}", v);
  // });
  // handle.join().unwrap();

  // ! 使用消息传递在线程间传送数据
  // ! Rust 中一个实现消息传递并发的主要工具是 信道（channel）
  // * 编程中的信息渠道（信道）有两部分组成，一个发送者（transmitter）和一个接收者（receiver）
  // * 当发送者或接收者任一被丢弃时可以认为信道被 关闭（closed）了

  // let (tx, rx) = mpsc::channel();
  // thread::spawn(move || {
  //   let s = String::from("hello");
  //   tx.send(s).unwrap();
  //   // 所有权已经移交
  //   // println!("s is {}", s);
  // });
  // let receiver = rx.recv().unwrap();
  // println!("receiver is {}", receiver);

  // ! 信道与所有权转移

  // ! 发送多个值并观察接收者的等待
  // let (tx, rx) = mpsc::channel();
  // thread::spawn(move || {
  //   let v = vec![
  //     String::from("hi"),
  //     String::from("from"),
  //     String::from("the"),
  //     String::from("thread"),
  //   ];

  //   for i in v {
  //     tx.send(i).unwrap();
  //     thread::sleep(Duration::from_millis(100));
  //   }
  // });

  // for j in rx {
  //   println!("recv is {}", j)
  // }

  // ! 通过克隆发送者来创建多个生产者
  let (tx, rx) = mpsc::channel();
  let tx_1 = tx.clone();

  thread::spawn(move || {
    let v = vec![
      String::from("hi"),
      String::from("from"),
      String::from("the"),
      String::from("thread"),
    ];

    for i in v {
      tx_1.send(i).unwrap();
      thread::sleep(Duration::from_millis(1));
    }
  });

  thread::spawn(move || {
    let v = vec![
      String::from("hi"),
      String::from("from"),
      String::from("the"),
      String::from("thread"),
    ];

    for i in v {
      tx.send(i).unwrap();
      thread::sleep(Duration::from_millis(1));
    }
  });

  for j in rx {
    println!("j is {}", j);
  }
}
