module.exports = function check(str, bracketsConfig) {
    let pre = Array.from(bracketsConfig);
    let rules = {};
    for (let i=0; i<pre.length; i++) {
        let prep = pre[i];
        for (let j=0; j<prep.length; j+=2) {
            rules[prep[j]] = prep[j+1];
        }
    }

    let stack = new Array();

    let str_arr = Array.from(str);
    for (let i=0; i<str_arr.length; i++) {
        if (rules[str_arr[i]] != undefined) {
            let data = stack.pop();
            if (data != undefined) stack.push(data);
            if ((str_arr[i] == "|" || str_arr[i] == "7" || str_arr[i] == "8") && str_arr[i] == data) stack.pop();
            else stack.push(str_arr[i]);
        }
        else if (stack.length == 0) return false;
            else {
                let data = stack.pop();
                stack.push(data);
                if (rules[data] == str_arr[i]) stack.pop();
                else return false;
            }
    }
    if (stack.length != 0) return false;
    return true;
}
