export function getMergeSortAnimations(array){
    if (array.length <=  1) return array;
    
    const animations = []
    const arrayCopy = array.slice();
    const startIdx = 0;
    const endIdx = array.length - 1

    
    mergeSort(array, startIdx, endIdx, arrayCopy, animations);


    return animations;
}

function mergeSort(mainArray, startIdx, endIdx, arrayCopy, animations){
    if(startIdx === endIdx) return;

    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    
    mergeSort(arrayCopy, startIdx, middleIdx, mainArray, animations);
    mergeSort(arrayCopy, middleIdx + 1, endIdx, mainArray, animations);
    merge(mainArray, startIdx, middleIdx, endIdx, arrayCopy, animations);

}

function merge(mainArray, startIdx, middleIdx, endIdx, arrayCopy, animations){
    let k = startIdx
    let i = startIdx
    let j = middleIdx + 1;

    while(i <= middleIdx && j <= endIdx){
        animations.push([i, j]);
        animations.push([i, j]);

        if(arrayCopy[i] <= arrayCopy[j]){
            animations.push([k, arrayCopy[i]]);
            mainArray[k++] = arrayCopy[j++];
        }else{
            animations.push([k, arrayCopy[j]]);
            mainArray[k++] = arrayCopy[j++];
        }

    }
    while(i <= middleIdx){
        animations.push([i, i]);    
        animations.push([i, i]);    
        animations.push([k, arrayCopy[i]]);
        
        mainArray[k++] = arrayCopy[i++];    
    
    }

    while(j <= endIdx){
        animations.push([j, j]);    
        animations.push([j, j]);    
        animations.push([k, arrayCopy[j]]);
        
        mainArray[k++] = arrayCopy[j++];    
    
    }
}