// songs

// step.1:判斷歌曲有幾個和弦、歌曲難易度
function train(chords, label, labels_array, songs_array, labelCounts_dict) {
    songs_array.push([label, chords]);
    labels_array.push(label);

    if (Object.keys(labelCounts_dict).includes(label)) {
        labelCounts_dict[label] = labelCounts_dict[label] + 1;
    } else {
        labelCounts_dict[label] = 1;
    }
    return [labels_array, songs_array, labelCounts_dict]
};


// step.2:機率計算
function setLabelProbabilities(labelCounts_dict, labelProbabilities_dict, songs_array) {
    Object.keys(labelCounts_dict).forEach(function(label) {
        let numberOfSongs = songs_array.length;
        labelProbabilities_dict[label] = labelCounts_dict[label] / numberOfSongs;
    });
    return labelProbabilities_dict;
};


function setProbabilityOfChordsInLabels(songs_array, chordCountsInLabels_dict) {
    // 計算和弦出現過幾次
    songs_array.forEach(function(i) {
        if (chordCountsInLabels_dict[i[0]] === undefined) {
            chordCountsInLabels_dict[i[0]] = {};
        }
        i[1].forEach(function(j) {
            if (chordCountsInLabels_dict[i[0]][j] > 0) {
                chordCountsInLabels_dict[i[0]][j] =
                    chordCountsInLabels_dict[i[0]][j] + 1;
            } else {
                chordCountsInLabels_dict[i[0]][j] = 1;
            }
        });
    });

    // 統計標籤中和弦出現的機率
    Object.keys(chordCountsInLabels_dict).forEach(function(i) {
        Object.keys(chordCountsInLabels_dict[i]).forEach(function(j) {
            chordCountsInLabels_dict[i][j] = chordCountsInLabels_dict[i][j] * 1.0 / songs_array.length;
        });
    });
    return chordCountsInLabels_dict;
}


// step.3:判斷歌曲難易度
function classify(chords, labelProbabilities_dict, chordCountsInLabels_dict) {
    let ttal = labelProbabilities_dict;
    let classified = {};
    Object.keys(ttal).forEach(function(obj) {
        let first = labelProbabilities_dict[obj] + 1.01;
        chords.forEach(function(chord) {
            let probabilityOfChordInLabel =
                chordCountsInLabels_dict[obj][chord];
            if (probabilityOfChordInLabel === undefined) {
                first + 1.01;
            } else {
                first = first * (probabilityOfChordInLabel + 1.01);
            }
        });
        classified[obj] = first;
    });
    return classified;
};

module.exports = {
    classify: classify,
    train: train,
    setLabelProbabilities: setLabelProbabilities,
    setProbabilityOfChordsInLabels: setProbabilityOfChordsInLabels

};