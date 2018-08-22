const TEXT_ELEMENT = 'text_element';

function render(element, parentDom) {
  const { props, type } = element;
  const dom =
    type === TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(type);
  const isListener = name => name.startsWith('on');
  const childElement = props.children || [];

  Object.keys(props)
    .filter(isListener)
    .map(key =>
      dom.addEventListener(key.toLocaleLowerCase().substring(2), props[key])
    );

  Object.keys(props).map(key => (dom[key] = props[key]));
  childElement.forEach(ele => render(ele, dom));
  parentDom.appendChild(dom);
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, {
    nodeValue: value
  });
}

function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const temp = hasChildren ? [].concat(args) : [];
  props.children = temp
    .map(v => {
      console.log(v);
      return v;
    })
    // .filter(c => c !== null && c !== false)
    .map(v => (v instanceof Object ? v : createTextElement(v)));
  return {
    type,
    props
  };
}

const dom = createElement(
  'div',
  { className: 'name', style: { width: 1000 } },
  createElement(
    'div',
    { onClick: () => console.log(1) },
    createElement('div', null, 'aaaa')
  ),
  createElement('span', null, 'hello world'),
  createElement('span', { className: '111' })
);

// console.log(dom);

render(dom, document.querySelector('#root'));
