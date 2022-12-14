pub struct Post {
  state: Option<Box<dyn State>>,
  content: String,
}

impl Post {
  fn new() -> Post {
    Post {
      state: Some(Box::new(Draft {})),
      content: String::new(),
    }
  }

  pub fn add_text(&mut self, text: &str) {
    self.content.push_str(text);
  }

  // pub fn content(&self) -> &str{
  // match self.state {
  //     Some(v) => v,
  //     None =>
  // }
  // }

  pub fn request_view(&mut self) {}

  pub fn approve() {}
}

trait State {}

struct Draft {}

impl State for Draft {}

struct PendingReview {}

impl State for PendingReview {}
