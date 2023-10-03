export function getBubbleSortAnimations(array){
    const animations = [];
    const arrayCopy = array.slice();
    bubbleSort(arrayCopy, animations);
    return animations;
}

// bubble sort helper function
function bubbleSort(arrayCopy, animations){
    const arrayLength = arrayCopy.length;

    let x = arrayLength - 1;
    while(x > 0){
        let swapped = false;
        for(let i = 0; i < x; ++i){
            animations.push(["comparison1", i, i + 1]);
            animations.push(["comparison2", i, i + 1]);
            if(arrayCopy[i] > arrayCopy[i + 1]){
                swapped = true;
                animations.push(["swap", i, arrayCopy[i + 1]]);
                animations.push(["swap", i + 1, arrayCopy[i]]);
                swap(arrayCopy, i, i + 1);
            }
        }
        if(!swapped) break;
        x--;
    }
}

// Swap helper function
function swap(array, idxOne, idxTwo){
    const temp = array[idxOne];
    array[idxOne] = array[idxTwo];
    array[idxTwo] = temp;
}