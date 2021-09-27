import { getCurrentPriorityLevel } from "./scheduler";

// TypeOfMode
const NoMode = 0;
const StrictMode = 1;
const BlockingMode = 2;
// devtools中的
const ProfileMode = 8;

// Lane 模型
const NoTimestamp = -1;
const TotalLanes = 31;
const NoLane = 0;
const SyncLane = 1;
const SyncBatchedLane = 2;
const InputDiscreteHydrationLane = 4;
const InputDiscreteLanes = 24;

// lane模式和权限的转换的映射
const SyncLanePriority = 15;
const SyncBatchedLanePriority = 14;

const InputDiscreteHydrationLanePriority = 13;
const InputDiscreteLanePriority = 12;

const InputContinuousHydrationLanePriority = 11;
const InputContinuousLanePriority = 10;

const DefaultHydrationLanePriority = 9;
const DefaultLanePriority = 8;
const TransitionPriority = 6;
const NoLanePriority = 0;

// workTag
const FunctionComponent = 0;
const ClassComponent = 1;
const IndeterminateComponent = 2; // Before we know whether it is function or class
const HostRoot = 3;

// packages/react-reconciler/src/ReactInternalTypes.js
function fiber(tag, pendingProps, key, mode) {
  // WorkTag
  // 组件类型  FunctionComponent  ClassComponent etc
  this.tag = tag;
  // child ckey
  this.key = key;

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.
  this.elementType = null;
  // The resolved function/class/ associated with this fiber.
  this.type = null;

  // The local state associated with this fiber.
  // fiber root
  this.stateNode = null;

  // A queue of state updates and callbacks.
  this.updateQueue = null;

  // The state used to create the output
  this.memoizedState = null;

  // fiber的数据结构 多指针单链表
  // stack frame 处理完成后返回结构
  this.return = null;
  this.child = null;
  this.sibling = null;

  // TypeOfMode
  // fiber生命周期内子树和父亲的mode应该保持一致
  this.mode = mode;

  this.lanes = null;

  this.childLanes = null;

  // 缓存当前fiber节点信息
  this.alternate = null;
}

function fiberRootNode(containerInfo, tag) {
  this.tag = containerInfo;
  this.containerInfo = containerInfo;
  this.current = null;

  this.pendingLanes = NoLane;
  this.suspendedLane = NoLane;
  this.pingedLane = NoLane;
  // 多个lane纠缠的通道
  this.entangledLanes = NoLane;
  this.entanglements = new Array(TotalLanes).fill(NoLane);

  // Node returned by Scheduler.scheduleCallback. Represents the next rendering
  // task that the root will work on.
  this.callbackNode = null;
  this.callbackPriority = null;
  this.eventTimes = new Array(TotalLanes).fill(NoLane);
  this.expirationTimes = new Array(TotalLanes).fill(NoLane);
}

// 根节点类型
const LegacyRoot = 0;
const BlockingRoot = 1;
const ConcurrentRoot = 2;

function createContainer(containerInfo, tag) {
  let fiberRoot = new fiberRootNode(containerInfo, tag);
  let mode;
  // 其他mode不考虑
  if (tag === NoMode) {
    mode = NoMode;
  }
  let hostRootFiber = new fiber(mode, null, null, tag);
  fiberRoot.current = hostRootFiber;
  hostRootFiber.stateNode = fiberRoot;
  // initialUpdateQueue(hostRootFiber)
  // 初始化更新队列
  const queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
    },
    effects: null,
  };
  fiber.updateQueue = queue;
  return fiberRoot;
}

function updateContainer(reactElement, fiberRoot, callback) {
  let currentFiber = fiberRoot.current;
  let now = requestEventTime();
  let lane = requestUpdateLane(currentFiber);
  let update = createUpdate(now, lane);
  update.payload = {
    reactElement,
  };
  update.callback = callback;

  enqueueUpdate(current, update);
  scheduleUpdateOnFiber(currentFiber, lane, now);
}

let currentEventTime = -1;
// 初始化updateContainer的时候会跟新时间
function requestEventTime() {
  if (currentEventTime != -1) {
    return currentEventTime;
  }

  currentEventTime = performance.now();
  return currentEventTime;
}

function requestUpdateLane(fiber) {
  let currentLane = fiber.lanes;
  // NoMode  StrictMode BlockingMode = 2 etc
  // 不同模式更新的优先级不一样
  // lane => NoLane SyLane = 1 值越小优先级越高
  // fiber初始化
  let mode = fiber.mode;
  // 不是阻塞的情况下
  if ((mode & BlockingMode) === NoMode) {
    return SyncLane;
  }

  // context逻辑
}

function createUpdate(eventTime, lane) {
  return {
    eventTime,
    lane,
    tag: "updateState",
    payload: null,
    callback: null,
    // 链表的指针
    next: null,
  };
}

function enqueueUpdate(current, update) {
  let currentUpdate = current.updateQueue;

  let shareQueue = currentUpdate.shared;
  let pending = shareQueue.pending;

  // TODO 不知道为什么要搞个环链表 猜想保持状态在一致pending中
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }

  shareQueue.update = update;
}

let nestedUpdateCount = 0;
let isRendering = false;
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  if (nestedUpdateCount > 50) {
    nestedUpdateCount = 0;
    console.error("死循环了");
  }
  // 更新lane
  //合并lane
  fiber.lanes = fiber.lanes | lane;
  if (fiber.alternate !== null) {
    fiber.alternate.lanes = fiber.alternate.lanes | lane;
  }

  let node = fiber;
  let parent = fiber.return;

  while (parent !== null) {
    parent.childLanes = parent.childLanes | lane;
    if (parent.alternate !== null) {
      parent.alternate.childLanes = parent.alternate.childLanes | lane;
    }
    node = parent;
    parent = parent.return;
  }

  let root = null;
  if (node.tag === HostRoot) {
    // fiber root
    root = node.stateNode;
  }

  root.pendingLanes |= lane;
  // 提高优先级 0b111 -> 0b110
  let higherPriorityLanes = lane - 1;
  root.suspendedLane &= higherPriorityLanes;
  root.pingedLane &= higherPriorityLanes;

  // clz32返回32位无符号整数前面有多少个0
  let index = TotalLanes - Math.clz32(lane);
  root.eventTimes[index] = lane;
  // 不做转换处理了 react为了避免冲突修改了权重值
  const priorityLevel = getCurrentPriorityLevel();

  if (lane === SyncLane) {
    // TODO Check if we're inside unbatchedUpdates and Check if we're not already rendering
    if (false) {
    } else {
      // 检查是否有其他lane被另外的work starved，如果标记他们过期，可以下一次
      markStarbedLanesAsExpired(root, eventTime);
      // 下一个更新的lane和权重
      let nextLanes = getNextLanes(root, NoLane);
    }
  }
}

function markStarbedLanesAsExpired(root, currentTime) {
  let pendingLanes = root.pendingLanes;
  let suspendedLanes = root.suspendedLanes;
  let pingedLanes = root.pingedLanes;
  let expirationTimes = root.expirationTimes;

  // 检查pending lanes 是否已经到达了他们的终止时间，
  let lanes = pendingLanes;
  while (lanes > 0) {
    let index = TotalLanes - Math.clz32(lanes);
    let lane = 1 << index;
    let expirationTime = expirationTimes[index];

    if (expirationTime === NoTimestamp) {
      if (
        (lane & suspendedLanes) === NoLane ||
        (lane & pingedLanes) !== NoLane
      ) {
        expirationTimes[index] = computeExpirationTime(lane, currentTime);
      }
    }
  }
}

let return_highestLanePriority = DefaultLanePriority;
function getHighestPriorityLanes(lane) {
  if ((SyncLane & lane) !== NoLane) {
    return_highestLanePriority = SyncLanePriority;
    return SyncLane;
  }

  if ((SyncBatchedLane & lane) !== NoLane) {
    return_highestLanePriority = SyncBatchedLanePriority;
    return SyncBatchedLane;
  }

  if ((InputDiscreteHydrationLane & lane) !== NoLane) {
    return_highestLanePriority = InputDiscreteHydrationLanePriority;
    return InputDiscreteHydrationLane;
  }

  if ((InputDiscreteLanes & lane) !== NoLane) {
    return_highestLanePriority = InputDiscreteLanePriority;
    return_InputDiscreteLanes = NoLanePriority;
  }
  // TODO ...
  return lane;
}

function getNextLanes(root, workInProgressLanes) {
  if (root.pendingLanes === NoLane) {
    return_highestLanePriority = NoLanePriority;
  }
}

function computeExpirationTime(lane, currentTime) {
  getHighestPriorityLanes(lane);

  if (return_highestLanePriority >= InputContinuousLanePriority) {
    return currentTime + 250;
  } else if (return_highestLanePriority >= TransitionPriority) {
    return currentTime + 5000;
  } else {
    return NoTimestamp;
  }
}

function enqueueSetState(instance, payload, callback) {
  var currentFiber = instance._reactinernals;
  var eventTime = requestEventTime();
}

export { createContainer, updateContainer };
