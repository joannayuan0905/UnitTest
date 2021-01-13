const classify = require('./nb-unitTest');

test('Check the result of 5 + ', () => {
    expect(classify(['d', 'g', 'e', 'dm'])).toEqual({
        easy: 2.023094827160494,
        medium: 1.855758613168724,
        hard: 1.855758613168724
    })

})


test('Check the result of 5 + ', () => {
    expect(classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m'])).toEqual({
        easy: 1.3433333333333333,
        medium: 1.5060259259259259,
        hard: 1.6884223991769547
    })

})