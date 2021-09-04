import React, { PureComponent, forwardRef } from 'react';
import { raf, caf } from '../前端/raf.js';

function noop() {}

function spring(val, config) {
    return {
        ...config,
        val
    };
}

let reusedTuple: [number, number] = [0, 0];
function stepper(secondPerFrame, x, v, destX, k, b, precision) {
    const Fspring = -k * (x - destX);
    const Fdamper = -b * v;
    const a = Fspring + Fdamper;
    const newV = v + a * secondPerFrame;
    const newX = x + newV * secondPerFrame;

    if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
        reusedTuple[0] = destX;
        reusedTuple[1] = 0;
        return reusedTuple;
    }

    reusedTuple[0] = newX;
    reusedTuple[1] = newV;
    return reusedTuple;
}

class Montion extends PureComponent {
    static defaultProps = {
        defaultStyle: {},
        style: {},
        children: noop,
        onRest: null
    };

    constructor(props) {
        super(props);
        this.state = {
            currentStyle: {}
        };
        this.lastTime = 0;
    }

    componentDidMount() {
        // 页面加载时候执行动画
        this.startAnimation();
    }

    componentWillUnmount() {
        // 只会清除计划中的raf 正在执行的不会收到影响
        caf(this.rafId);
        this.unmounting = true;
    }

    startAnimation() {
        const msPerFrame = 1000 / 60;
        const { onRest, style } = this.props;
        const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

        if (this.unmounting) {
            return;
        }

        this.rafId = raf((timestamp) => {
            if (this.unmounting) {
                return;
            }

            if (onRest) {
                this.onRest();
                return;
            }

            this.isAnimating = true;

            if (!this.lastTime) {
                this.lastTime = timestamp;
            }
            this.currentTime = Date.now();
            this.deltaTime = this.currentTime - this.lastTime;

            // todo
            let currentFrameCompletion = (this.deltaTime - Math.floor(this.deltaTime / msPerFrame) * msPerFrame) / msPerFrame;
            let framesToCatchUp = Math.floor(this.deltaTime / msPerFrame);

            let newLastIdealStyle = {};
            let newCurrentStyle = {};

            for (let key in style) {
                if (!hasOwnProperty(key)) {
                    continue;
                }

                
                
            }
        });
    }

    render() {
        const children = this.props.children(this.state.currentStyle);
        return children;
    }
}

export { Montion, spring };
