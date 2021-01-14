const myModule = require('./nb-unitTest');
const classify =  myModule.classify
const setLabelProbabilities =  myModule.setLabelProbabilities
const setProbabilityOfChordsInLabels =  myModule.setProbabilityOfChordsInLabels

const train =  myModule.train

var imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
var somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
var tooManyCooks = ['c', 'g', 'f'];
var iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
var babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
var creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
var paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
    'em7', 'a7', 'f7', 'b'
];
var toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
    'g7'
];
var bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
var labels = [];
var labelCounts = {};

var labelProbabilities = {};
var chordCountsInLabels = {};

let songs = [];
[labels, songs, labelCounts] = train(imagine, 'easy', labels, songs, labelCounts);
[labels, songs, labelCounts] = train(somewhere_over_the_rainbow, 'easy', labels, songs, labelCounts);
[labels, songs, labelCounts] = train(tooManyCooks, 'easy', labels, songs, labelCounts);
[labels, songs, labelCounts] = train(iWillFollowYouIntoTheDark, 'medium', labels, songs, labelCounts);
[labels, songs, labelCounts] = train(babyOneMoreTime, 'medium', labels, songs, labelCounts);
[labels, songs, labelCounts] = train(creep, 'medium', labels, songs, labelCounts);
[labels, songs, labelCounts] = train(paperBag, 'hard', labels, songs, labelCounts);
[labels, songs, labelCounts] = train(toxic, 'hard', labels, songs, labelCounts);
[labels, songs, labelCounts] = train(bulletproof, 'hard', labels, songs, labelCounts);


labelProbabilities = setLabelProbabilities(labelCounts, labelProbabilities, songs);
chordCountsInLabels = setProbabilityOfChordsInLabels(songs, chordCountsInLabels);

// 最終結果測試
test('Check the result ', () => {
    expect(classify(['d', 'g', 'e', 'dm'], labelProbabilities, chordCountsInLabels)).toEqual({
        easy: 2.023094827160494,
        medium: 1.855758613168724,
        hard: 1.855758613168724
    })
})


test('Check the result ', () => {
    expect(classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m'], labelProbabilities, chordCountsInLabels)).toEqual({
        easy: 1.3433333333333333,
        medium: 1.5060259259259259,
        hard: 1.6884223991769547
    })
})