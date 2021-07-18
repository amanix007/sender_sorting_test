// compare two array sorting with each other 
// find out similarity percentage

function CompareSortingAccuracyWithAnotherArray1 (arr1,arr2){


}



function CompareSortingAccuracyWithAnotherArray2 (arr1,arr2){
    var total = arr1.length;
var count = 0;
for(var i = 0; i < total; i++){
    if(arr1[i] == arr2[i]){
        count++;
    }
}
return (count/total)*100;
}

function CompareSortingAccuracyWithAnotherArray3 (arr1,arr2){
    var arr1_sorted = arr1.sort();
var arr2_sorted = arr2.sort();

var count = 0;
for (var i = 0; i < arr1_sorted.length; i++) {
    if (arr1_sorted[i] == arr2_sorted[i]) {
        count++;
    }
}

var percent = count/arr1_sorted.length*100;
return percent;
}


function CompareSortingAccuracyWithAnotherArray4 (arr1,arr2){
    var arr1_sorted = arr1.sort();
var arr2_sorted = arr2.sort();

var i = 0;
var j = 0;
var count = 0;
var length = arr1.length;

for (i = 0; i < length; i++) {
    if (arr1_sorted[i] == arr2_sorted[i]){
        count++;
    }
}

return (count / length) * 100;
}


function CompareSortingAccuracyWithAnotherArray5 (arr1,arr2){
    var arr1 = arr1.sort();
var arr2 = arr2.sort();
var n = arr1.length;
var i = 0;
var j = 0;
var k = 0;
var count = 0;
var similarity = 0;
for (i = 0; i < n; i++){
    if(arr1[i] == arr2[i]){
        count++;
    }
}
similarity = (count/n)*100;
return similarity;
}


function CompareSortingAccuracyWithAnotherArray6 (arr1,arr2){
    var arr1_len = arr1.length;
var arr2_len = arr2.length;
var i,j;
var count = 0;
var count_match = 0;
for (i = 0; i < arr1_len; i++){
    for (j = 0; j < arr2_len; j++){
        if (arr1[i] === arr2[j]){
            count_match++;
            break;
        }
    }
}
count = (arr1_len*arr2_len - count_match);
var percentage = (100 - (count/arr1_len*100));
return percentage;
}