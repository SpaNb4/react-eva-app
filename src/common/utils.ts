export function isEqualObjectInArr(
    arr: ISolarSystem[] | ICorporation[] | ICeo[],
    object: ISolarSystem | ICorporation | ICeo,
    id: string
) {
    return arr.some((el: any) => el[id] === object[id]);
}

export function sortByName(arr: ISearch[]) {
    let sortedArr = [...arr];

    sortedArr.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    return sortedArr;
}
