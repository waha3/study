import React, { useState, FC, useEffect, useMemo, useCallback, Fragment, useRef, cloneElement } from "react";

interface MotionProps {
  style: { [key: string]: any };
  children: (styles: MotionProps["style"]) => React.ReactElement;
}

type p = {
  x: number;
  y: number;
};

const Motion: FC<MotionProps> = ({ style, children }) => {
  const [computedStyles, setComputedStyles] = useState(style);
  const motionRef = useRef(null);


  useEffect(() => {

    // console.log(motionRef.current.offsetHeight);
  }, [])

  // 0 <= t <= 1
  const threeOrderBezier = (p0: p, p1: p, p2: p, p3: p, t: number) => {
    return {
      x:
        p0.x * Math.pow(1 - t, 3) +
        3 * p1.x * t * Math.pow(1 - t, 2) +
        3 * p2.x * Math.pow(t, 2) * (1 - t) +
        p3.x * Math.pow(t, 3),
      y:
        p0.y * Math.pow(1 - t, 3) +
        3 * p1.y * t * Math.pow(1 - t, 2) +
        3 * p2.y * Math.pow(t, 2) * (1 - t) +
        p3.y * Math.pow(t, 3),
    };
  };

  useEffect(() => {
    let start = undefined;
    let newStyle = {};

    for (let key in style) {
      if (typeof style[key] === 'function') {
        newStyle[key] = style[key](motionRef.current)
      } else {
        newStyle[key] = style[key]
      }
    }

    // console.log('newStyle', newStyle);

    let step = (t: number) => {
      if (start === undefined) {
        start = t;
      }

      const elapsed = t - start;
      // let newStyle = {};
      // 0.2s 0.34, 0.69, 0.1, 1
      // for (let key in styles) {
      //   // newStyle[key] =
      //   //   newStyle[key] *
      //   //   threeOrderBezier(
      //   //     { x: 0, y: 0 },
      //   //     { x: 0.34, y: 0.69 },
      //   //     { x: 0.1, y: 1 },
      //   //     { x: 1, y: 1 },
      //   //     t
      //   //   ).x;
      //   newStyle[key] = Math.min(styles[key], 0.1 * elapsed * styles[key]);
      //   setComputedStyles(newStyle);
      // }

      for (let key in style) {
        // if (typeof style[key] === 'function') {
        //   newStyle[key] = style[key](motionRef.current) - 0.4
        // } else {
        //   newStyle[key] = style[key]
        // }
        newStyle[key] = newStyle[key] - 0.1 * 20;
      }

      setComputedStyles(newStyle);

      if (elapsed <= 200) {
        window.requestAnimationFrame(step);
      }
    };
  }, [style]);

  console.log('computedStyles', computedStyles);

  return  cloneElement(children(computedStyles), {
    ref: motionRef
  });
};

export default Motion;
