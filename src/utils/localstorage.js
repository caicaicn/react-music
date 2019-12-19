/**
 * 设置localStorage
 * @name timer 标记localStorage存入的时间
*/


export const setLocalStorage = function (key, value) {
    var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列 
    var valueDate = JSON.stringify({
        val: value,
        timer: curtime
    });
    localStorage.setItem(key, valueDate);
}


/**
 * 获取localStorage
 * @name days 判断localStorage有效的天数，超过指定时间清除localStorage，返回null
*/

export const getLocalStorage = function (key, days = 1) {
    let newValue = "";
    var exp = days * 24 * 60 * 60 * 1000; // 一天的ms数
    if (localStorage.getItem(key)) {
        var vals = localStorage.getItem(key); // 获取本地存储的值 
        var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
        // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间 
        var isTimed = (new Date().getTime() - dataObj.timer) > exp;

        if (isTimed) {
            console.log("存储已过期");
            localStorage.removeItem(key);
            return newValue;
        } else {
            newValue = dataObj.val;
        }
        return newValue;
    } else {
        return newValue;
    }
}

/**
 * 清除指定key的localStorage
*/

export const removeLocalStorage = function (key) {
    localStorage.removeItem(key);
}