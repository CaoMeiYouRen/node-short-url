/**
 * 获取指定长度的随机字符串
 *
 * @author CaoMeiYouRen
 * @date 2019-11-14
 * @export
 * @param {number} n
 * @param {boolean} [useSpecial] 使用包含[!at#$%^&*]的特殊字符
 * @returns {string}
 */
export function getRandomCode(n: number, useSpecial?: boolean): string {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    if (useSpecial) {
        const chats2 = '!@#$%^&*'.split('')
        chars = chars.concat(chats2)
    }
    let res = ''
    const l = chars.length - 1
    for (let i = 0; i < n; i++) {
        const id = Math.ceil(Math.random() * l)
        res += chars[id]
    }
    return res
}