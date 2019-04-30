// 数组排序
function arraySort(array, asc) {
    return array.sort(function (a, b) {
        return asc === 'asc' ? a - b : b - a;
    })
}

// 计算数组中每个成员出现的次数，返回一个去重的次数数组
function getCountArrayForGroupByCard(array, asc) {
    var ret = getGroupByCard(array);
    var r = [];
    for (var i in ret) {
        (r.indexOf(ret[i]) === -1) && r.push(ret[i]);
    }
    r = arraySort(r, asc);
    return r;
}

// 统计数组中每个成员出现的次数
function getGroupByCard(array) {
    var ret = {};
    array.forEach(function (item) {
        if (ret[item] === undefined) {
            ret[item] = 0;
        }
        ret[item]++;
    });
    return ret;
}

// 数组去重
function arrayClearRepeat(array) {
    var ret = [];
    array.forEach(function (item) {
        if (ret.indexOf(item) === -1) {
            ret.push(item);
        }
    });
    return ret;
}

// 从一个数组中过滤掉 >=n 的成员
function removeItemOverOf(array, n) {
    return array.filter(function (item) {
        return item < n;
    });
}

// 数组的最大成员是否 < n;
function maxItemLessThan(array, n) {
    return Math.max.apply(Math, array) < n;
}

// 数组的最大成员是否 >= n;
function maxItemMoreThan(array, n) {
    return Math.max.apply(Math, array) >= n;
}

// 获取数组中最小的成员;
function getMinItem(array) {
    if (!array.length) {
        return undefined;
    }
    return Math.min.apply(Math, array);
}
// 获取数组中最大的成员
function getMaxItem(array) {
    if (!array.length) {
        return undefined;
    }
    return Math.max.apply(Math, array);
}

// 筛选数组中累计出现过至少n次的成员
function getCardByCountOverOf(array, n) {
    var ret = getGroupByCard(array);
    var r = [];
    for (var i in ret) {
        if (ret[i] >= n) {
            r.push(parseInt(i));
        }
    }
    return r;
}

// 筛选数组中出现过n次的成员
function getCardByCount(array, n) {
    var ret = getGroupByCard(array);
    var r = [];
    for (var i in ret) {
        if (ret[i] === n) {
            r.push(parseInt(i));
        }
    }
    return r;
}

// 筛选数组中出现n次的成员与其它出现n次的成员，
// 若能组成等差数组，则返回这些成员的list（最长的那个等差数列,若长度一致，取最大的那一列）
function getSequence(array, n) {
    var r = arraySort(getCardByCount(array, n), 'asc');
    var rets = [];
    var ret = [];
    var maxIndex = r.length - 1;
    for (var i = 0; i < maxIndex; i++) {
        var prev = r[i];
        var curr = r[i + 1];
        if (curr - prev === 1 && curr < 15) {
            if (ret.indexOf(prev) === -1) {
                ret.push(prev);
            }
            if (ret.indexOf(curr) === -1) {
                ret.push(curr);
            }
            if (i === maxIndex - 1) {
                rets.push(ret);
            }
        } else {
            rets.push(ret);
            ret = [];
        }
    }
    rets = rets.sort(function (a, b) {
        return a.length - b.length;
    });
    return rets.pop() || [];

}

// 检查数组是否为等差数组 （差值 1）
//  {Array} param
//  {boolean} return
function checkSequence(array) {
    array = arraySort(array, 'asc');
    for (var i = 0, len = array.length - 1; i < len; i++) {
        var prev = array[i];
        var current = array[i + 1];
        if (current - prev !== 1) {
            return false;
        }
    }
    return true;
}

// 出牌类型
const TYPES = {
    // [1张的时候] 
    //  单张
    A: function (cards) {
        return {
            len: 1,
            key: cards[0],
            status: cards.length === 1
        }
    },

    // [2张的时候] 
    // 对子
    AA: function (cards) {
        var status = cards.length === 2 && cards[0] === cards[1];
        return {
            len: 2,
            key: cards[0],
            status: status
        }
    },

    // [3张的时候] 
    // 三张
    AAA: function (cards) {
        var status = cards.length === 3 && cards[0] === cards[1] && cards[1] === cards[2];
        return {
            len: 3,
            key: cards[0],
            status: status
        }
    },

    // 3小王炸
    XKING3: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && ret[0] === 16 && cards.length === 3;
        return {
            len: 3,
            key: cards[0],
            status: status
        }
    },

    // 3大王炸
    DKING3: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && ret[0] === 17 && cards.length === 3;
        return {
            len: 3,
            key: cards[0],
            status: status
        }
    },

    // [4张的时候] 
    // 炸弹（四张）
    AAAA: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 4;
        return {
            len: 4,
            key: cards[0],
            status: status
        }
    },

    // 4小王炸
    XKING4: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && ret[0] === 16 && cards.length === 4;
        return {
            len: 4,
            key: cards[0],
            status: status
        }
    },

    // 4大王炸
    DKING4: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && ret[0] === 17 && cards.length === 4;
        return {
            len: 4,
            key: cards[0],
            status: status
        }
    },

    // [5张的时候] 
    AAAA_5: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 5;
        return {
            len: 5,
            key: cards[0],
            status: status
        }
    },

    // 5小王炸
    XKING5: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && ret[0] === 16 && cards.length === 5;
        return {
            len: 5,
            key: cards[0],
            status: status
        }
    },

    // 5大王炸
    DKING5: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && ret[0] === 17 && cards.length === 5;
        return {
            len: 5,
            key: cards[0],
            status: status
        }
    },

    // [6张的时候] 
    AAAA_6: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 6;
        return {
            len: 6,
            key: cards[0],
            status: status
        }
    },

    // 6小王炸
    XKING6: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && ret[0] === 16 && cards.length === 6;
        return {
            len: 6,
            key: cards[0],
            status: status
        }
    },

    // 6大王炸
    DKING6: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && ret[0] === 17 && cards.length === 6;
        return {
            len: 6,
            key: cards[0],
            status: status
        }
    },

    // [7张的时候] 
    AAAA_7: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 7;
        return {
            len: 7,
            key: cards[0],
            status: status
        }
    },

    // [8张的时候] 
    AAAA_8: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 8;
        return {
            len: 8,
            key: cards[0],
            status: status
        }
    },

    // [9张的时候] 
    AAAA_9: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 9;
        return {
            len: 9,
            key: cards[0],
            status: status
        }
    },

    // [10张的时候] 
    AAAA_10: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 10;
        return {
            len: 10,
            key: cards[0],
            status: status
        }
    },

    // [11张的时候] 
    AAAA_11: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 11;
        return {
            len: 11,
            key: cards[0],
            status: status
        }
    },

    // [12张的时候] 
    AAAA_12: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 12;
        return {
            len: 12,
            key: cards[0],
            status: status
        }
    },

    // [13张的时候] 
    AAAA_13: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 13;
        return {
            len: 13,
            key: cards[0],
            status: status
        }
    },

    // [14张的时候] 
    AAAA_14: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 14;
        return {
            len: 14,
            key: cards[0],
            status: status
        }
    },

    // [15张的时候] 
    AAAA_15: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 15;
        return {
            len: 15,
            key: cards[0],
            status: status
        }
    },

    // [16张的时候] 
    AAAA_16: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 16;
        return {
            len: 16,
            key: cards[0],
            status: status
        }
    },

    // [17张的时候] 
    AAAA_17: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 17;
        return {
            len: 17,
            key: cards[0],
            status: status
        }
    },

    // [18张的时候] 
    AAAA_18: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 18;
        return {
            len: 18,
            key: cards[0],
            status: status
        }
    },

    // [19张的时候] 
    AAAA_19: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 19;
        return {
            len: 19,
            key: cards[0],
            status: status
        }
    },

    // [20张的时候] 
    AAAA_20: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 20;
        return {
            len: 20,
            key: cards[0],
            status: status
        }
    },

    // [21张的时候] 
    AAAA_21: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 21;
        return {
            len: 21,
            key: cards[0],
            status: status
        }
    },

    // [22张的时候] 
    AAAA_22: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 22;
        return {
            len: 22,
            key: cards[0],
            status: status
        }
    },

    // [23张的时候] 
    AAAA_23: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 23;
        return {
            len: 23,
            key: cards[0],
            status: status
        }
    },

    // [24张的时候] 
    AAAA_24: function (cards) {
        var ret = arrayClearRepeat(cards);
        var status = ret.length === 1 && cards.length === 24;
        return {
            len: 24,
            key: cards[0],
            status: status
        }
    },

}

var cardValidator = {
    1: [['A', TYPES.A]],
    2: [['AA', TYPES.AA]],
    3: [['AAA', TYPES.AAA], ['XKING3',TYPES.XKING3], ['DKING3',TYPES.DKING3]],
    4: [['AAAA', TYPES.AAAA], ['XKING4',TYPES.XKING4], ['DKING4',TYPES.DKING4]],
    5: [['AAAA_5', TYPES.AAAA_5], ['XKING5',TYPES.XKING5], ['DKING5',TYPES.DKING5]],
    6: [['AAAA_6', TYPES.AAAA_6], ['XKING6',TYPES.XKING6], ['DKING6',TYPES.DKING6]],
    7: [['AAAA_7',TYPES.AAAA_7]],
    8: [['AAAA_8',TYPES.AAAA_8]],
    9: [['AAAA_9',TYPES.AAAA_9]],
    10: [['AAAA_10',TYPES.AAAA_10]],
    11: [['AAAA_11',TYPES.AAAA_11]],
    12: [['AAAA_12',TYPES.AAAA_12]],
    13: [['AAAA_13',TYPES.AAAA_13]],
    14: [['AAAA_14',TYPES.AAAA_14]],
    15: [['AAAA_15',TYPES.AAAA_15]],
    16: [['AAAA_16',TYPES.AAAA_16]],
    17: [['AAAA_17',TYPES.AAAA_17]],
    18: [['AAAA_18',TYPES.AAAA_18]],
    19: [['AAAA_19',TYPES.AAAA_19]],
    20: [['AAAA_20',TYPES.AAAA_20]],
    21: [['AAAA_21',TYPES.AAAA_21]],
    22: [['AAAA_22',TYPES.AAAA_22]],
    23: [['AAAA_23',TYPES.AAAA_23]],
    24: [['AAAA_24',TYPES.AAAA_24]],
}


//验证牌型
function validate(cards) {
    var len = cards.length;
    var int_cards = cards.map(function (card) {
        return card.value;
    });
    var validators = cardValidator[len];
    if (len < 1 || len > 25 || !validators.length) {
        return {
            status: false,
            len: len,
            types: []
        };
    }
    var ret = [];
    validators.forEach(function (array) {
        var type = array[0];
        var validator = array[1];
        var result = validator(int_cards);
        if (result.status) {
            result.type = type;
            ret.push({key:result.key,type:type});
        }
    });
    if (ret.length) {
        return {
            status: true,
            len: len,
            types: ret
        }
    } else {
        return {
            status: false,
            len: len,
            types: []
        };
    }
}

