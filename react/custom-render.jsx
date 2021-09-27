import React from "react";
import Reconciler from "react-reconciler";
import { App } from "./Comonent";

const NO_CONTEXT = {};
const UPPERCASE_CONTEXT = {};
const UPDATE_SIGNAL = {};

const HostConfig = {
  // react-dom react-art react-native的模式
  supportsMutation: true,
  // 渲染阶段
  createInstance(type, props, rootContainer, hostContext, internalHandle) {
    console.log("createInstance", rootContainer, type, props);
    let dom = document.createElement(type);
    Object.keys(props).map((key) => {
      // TODO react的实现是代理到某个根节点上
      if (key.startsWith("on")) {
        let eventName = key.replace("on", "").toLowerCase();
        dom.addEventListener(eventName, props[key]);
      } else if (key === "className") {
        dom.setAttribute("class", props[key]);
      } else {
        dom.setAttribute(key, props[key]);
      }
    });
    return dom;
  },
  createTextInstance(text, rootContainer, hostContext, internalHandle) {
    console.log(
      "createTextInstance",
      text,
      rootContainer,
      hostContext,
      internalHandle
    );
    return document.createTextNode(text);
  },

  getPublicInstance(instance) {
    console.log("getPublicInstance", instance);
    return instance;
  },
  getRootHostContext(rootContainer) {
    console.log("getRootHostContext", rootContainer);
    return NO_CONTEXT;
  },
  getChildHostContext(parentHostContext, type, rootContainer) {
    console.log("getChildHostContext", parentHostContext, type, rootContainer);
    // if (type === 'offscreen') {
    //   return parentHostContext
    // }

    // if (type === 'uppercase') {
    //   return UPPERCASE_CONTEXT
    // }
    // return NO_CONTEXT
    return parentHostContext;
  },
  prepareForCommit(containerInfo) {
    console.log("prepareForCommit", containerInfo);
    return null;
  },
  resetAfterCommit(containerInfo) {
    console.log("resetAfterCommit", containerInfo);
    return containerInfo;
  },

  appendInitialChild(parentInstance, child) {
    console.log("appendInitialChild", parentInstance, child);
    parentInstance.appendChild(child);
  },
  finalizeInitialChildren(instance, type, props, rootContainer, hostContext) {
    console.log(
      "finalizeInitialChildren",
      instance,
      type,
      props,
      rootContainer,
      hostContext
    );
    // return false;
    rootContainer.appendChild(instance);
    return true;
  },
  shouldSetTextContent() {},
  // scheduleTimeout() {},
  // cancelTimeout() {},
  // noTimeout: -1,
  now() {
    console.log("now");
    return performance.now();
  },
  // isPrimaryRenderer() {},
  // warnsIfNotActing() {},
  // supportsMutation() {},
  // supportsPersistence() {},
  // supportsHydration() {},
  // getInstanceFromNode() {},
  // isOpaqueHydratingObject() {},
  // makeOpaqueHydratingObject() {},
  // makeClientId() {},
  // makeClientIdInDEV() {},
  // beforeActiveInstanceBlur() {},
  // afterActiveInstanceBlur() {},
  preparePortalMount(containerInfo) {
    console.log("preparePortalMount", containerInfo);
  },
  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainer,
    hostContext
  ) {
    console.log(
      "prepareUpdate",
      instance,
      type,
      oldProps,
      newProps,
      rootContainer,
      hostContext
    );
    return null;
  },
  commitMount(instance, type, props, internalHandle) {
    console.log("commitmount", instance, type, props, internalHandle);
  },
  commitTextUpdate(textInstance, prevText, nextText) {
    console.log("commitTextUpdate", textInstance, prevText, nextText);
    if (prevText !== nextText) {
      return (textInstance.data = nextText);
    }
  },
  commitUpdate(
    instance,
    updatePayload,
    type,
    prevProps,
    nextProps,
    internalHandle
  ) {
    console.log(
      "commitUpdate",
      instance,
      updatePayload,
      type,
      prevProps,
      nextProps,
      internalHandle
    );
  },
  // getInstanceFromScope() {},
  // getCurrentEventPriority() {},
  // detachDeletedInstance() {},
  clearContainer(containerInfo) {
    console.log("clearcontainer", containerInfo);
  },
  removeChildFromContainer(container, child) {
    console.log("removeChildFromContainer", container, child);
  },
  appendChildToContainer(container, child) {
    console.log("appendChildToContainer", container, child);
  },
  supportsMicrotask() {
    return true;
  },
};

const ReconcilerIns = Reconciler(HostConfig);

function render(reactElement, domElement, callback) {
  if (!domElement._rootContainer) {
    // tag = LegacyRoot
    domElement._rootContainer = ReconcilerIns.createContainer(domElement, 0);
  }

  // console.log(domElement._rootContainer)
  ReconcilerIns.updateContainer(
    reactElement,
    domElement._rootContainer,
    null,
    callback
  );
}

render(<App name="hello" />, document.getElementById("app"), () => {
  console.log("render callback");
});
