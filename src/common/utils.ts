export function isEqualObjectInArr(arr: any, object: any, id: any) {
    return arr.some((el: any) => el[id] === object[id]);
}
