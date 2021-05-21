export function deepClone(target) {
    // 定义一个变量
    let result
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = [] // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target
    }
    // 返回最终结果
    return result
}

export function deepCompare(x, y) {
    var i, l, leftChain, rightChain

    function compare2Objects(x, y) {
        var p

        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true
        }

        if (x === y) {
            return true
        }

        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString()
        }

        if (!(x instanceof Object && y instanceof Object)) {
            return false
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false
        }

        if (x.constructor !== y.constructor) {
            return false
        }

        if (x.prototype !== y.prototype) {
            return false
        }

        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false
        }

        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false
            } else if (typeof y[p] !== typeof x[p]) {
                return false
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false
            } else if (typeof y[p] !== typeof x[p]) {
                return false
            }

            switch (typeof (x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x)
                    rightChain.push(y)

                    if (!compare2Objects(x[p], y[p])) {
                        return false
                    }

                    leftChain.pop()
                    rightChain.pop()
                    break

                default:
                    if (x[p] !== y[p]) {
                        return false
                    }
                    break
            }
        }

        return true
    }

    if (arguments.length < 1) {
        return true
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = [] 
        rightChain = []

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false
        }
    }

    return true
}
