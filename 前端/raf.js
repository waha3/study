const root = typeof window === 'undefined' ? global : window;

const vendors = ['moz', 'webkit'];
const suffix = 'AnimationFrame';
let raf = root['request' + suffix];
let caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

for (let i = 0; !raf && i < vendors.length; i++) {
    raf = root[vendors[i] + 'Request' + suffix];
    caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
}

// Some versions of FF have rAF but not cAF

if (!raf || !caf) {
    let last = 0;
    let id = 0;
    let frame = (1 * 1000) / 60;
    let queue = [];

    raf = function (callback) {
        let now = Date.now();

        let duration = Math.max(0, frame - (now - last));
        last = now + duration;

        if (queue.length === 0) {
            setTimeout(function () {
                let copy = queue.slice();
                // 清空 quene
                queue.length = 0;
                for (let i = 0; i < copy.length; i++) {
                    let cp = copy[i];
                    if (!cp.cancelled) {
                        cp.callback(last);
                    }
                }
            }, Math.round(duration));
        }

        queue.push({
            handleId: ++id,
            callback: callback,
            cancelled: false
        });
        return id;
    };

    caf = function (handleId) {
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].handleId === handleId) {
                queue[i].cancelled = true;
            }
        }
    };
}

export { raf, caf };
