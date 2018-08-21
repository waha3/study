const element = {
  type: 'div',
  props: {
    id: 'xxx',
    children: [
      {
        type: 'input',
        props: {
          value: 'hello world'
        }
      }
      // {
      //   type: 'TEXT_NODE',
      //   value: 'plain text'
      // }
    ]
  }
};

function render(element, parentDom) {
  const { props, type } = element;
  const dom = document.createElement(type);
  const isListener = name => name.startWith('on');
  const isTextNode = name => name === 'TEXT_NODE';
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

render(element, document.querySelector('#root'));
