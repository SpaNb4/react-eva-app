import { sortByName, isEqualObjectInArr } from '../common/utils';

test('sort by name', () => {
    expect(
        sortByName([
            { id: 1, name: 'Lena' },
            { id: 2, name: 'Vasya' },
            { id: 3, name: 'Alex' },
        ])
    ).toEqual([
        { id: 3, name: 'Alex' },
        { id: 1, name: 'Lena' },
        { id: 2, name: 'Vasya' },
    ]);
});

test('is equal object in array', () => {
    expect(
        isEqualObjectInArr(
            [
                { id: 1, name: 'Andrew' },
                { id: 2, name: 'John' },
            ],
            { id: 1, name: 'Andrew' },
            'id'
        )
    ).toBe(true);
});
