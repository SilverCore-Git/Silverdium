/**
 * @author Silverdium
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0
 */

let head = {
    inner: [
        [8, 8, 8, 8],
        [24, 8, 8, 8],
        [0, 8, 8, 8],
        [16, 8, 8, 8],
        [8, 0, 8, 8],
        [16, 0, 8, 8]
    ],
    outer: [
        [40, 8, 8, 8],
        [56, 8, 8, 8],
        [32, 8, 8, 8],
        [48, 8, 8, 8],
        [40, 0, 8, 8],
        [48, 0, 8, 8]
    ]
}

let body = {
    inner: [
        [20, 20, 8, 12],
        [32, 20, 8, 12],
        [16, 20, 4, 12],
        [28, 20, 4, 12],
        [20, 16, 8, 4],
        [28, 16, 8, 4]
    ],
    outer: [
        [20, 36, 8, 12],
        [32, 36, 8, 12],
        [16, 36, 4, 12],
        [28, 36, 4, 12],
        [20, 32, 8, 4],
        [28, 32, 8, 4]
    ]
}


export {
    head as head,
    body as body
}