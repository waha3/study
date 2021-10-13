// function render(element reactElement, container, callback) {

// }

// type reactElement = number | string
// function createElement(type, config, ...children) {
//   let props = {};

//   for (let key in config) {
//     props[key] = config[key];
//   }
//   props.children = Array.from(children);

//   // component defaultProps
//   if (type && type.defaultProps) {
//     for (let key in type.defaultProps) {
//       props[key] = defaultProps[key];
//     }
//   }

//   return {
//     type,
//     key: config.key,
//     ref: config.ref,
//     props,
//   };
// }

// class Component {
//   constructor(props, context, updater) {
//     this.props = props;
//     this.context = context;
//     this.blingrefs = {};
//     this.updater = updater;
//   }
//   setState(partialState, callback) {}
//   forUpdate(callback) {}
// }

type Fiber = {
  stateNode: Document
  sibling: Fiber
  child: Fiber
  parent: Fiber
}


function createDom(fiber: Fiber) {

}

let nextUnitOfWork: any = null;
function workLoop(deadline: IdleDeadline) {
  while (nextUnitOfWork || (deadline.timeRemaining() > 0 && !deadline.didTimeout)) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

window.requestIdleCallback(workLoop);

function performUnitOfWork(fiber: Fiber) {}

function workLoopSync() {}

function workLoopCon() {}



