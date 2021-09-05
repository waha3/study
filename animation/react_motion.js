import React from "react";

const presets = {
  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
  gentle: { stiffness: 120, damping: 14 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 210, damping: 20 },
};

export const spring = (config, val) => {
  return {
    ...presets.noWobble,
    ...config,
    val,
  };
};

export class Motion extends React.PureComponent {
  static defaultProps = {
    style: Object.create(null),
    config: presets.noWobble,
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //     const isPlainObject = (obj) => {
  //         return Object.keys(obj).length === 0;
  //     };

  //     if (isPlainObject(prevState.style)) {
  //         return {
  //             style: nextProps.style
  //         };
  //     }
  //     return null;
  // }

  constructor(props) {
    super(props);
    this.state = {
      style: {},
    };
  }

  componentDidMount() {
    this.springAnimation();
  }

  springAnimation() {
    const { style, config } = this.props;

    const frame = 1 / 60;
    const dampingForce = (damping, v) => damping * v;
    const acceleration = (
      displacement = 0,
      speed = 0,
      stiffness = config.stiffness,
      mass = 1,
      damping = config.damping
    ) => {
      return (-stiffness * displacement + dampingForce(damping, speed)) / mass;
    };

    let lastSpeed = 0;
    let lastPosition = 0;
    let computedStyle = {};

    this.rafId = window.requestAnimationFrame(() => {
      for (let key in style) {
        lastSpeed = frame * acceleration(lastPosition, lastSpeed) + lastSpeed;
        lastPosition =
          lastPosition + acceleration(lastPosition, lastSpeed) * frame;

        if (style[key] <= lastPosition) {
          window.cancelAnimationFrame(this.rafId);
        }

        // console.log(lastPosition, lastSpeed);

        computedStyle[key] = lastPosition;
        this.setState({
          style: computedStyle,
        });
      }

      this.springAnimation();
    });
  }

  render() {
    const { children } = this.props;
    const { style } = this.state;
    return children(style);
  }
}
