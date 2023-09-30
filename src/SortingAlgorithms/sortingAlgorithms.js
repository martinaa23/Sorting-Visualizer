export const bubbleSort = array => {
    const animations = [];
    const arrayLength = array.length;

    if(arrayLength === 1) return animations;

    for(let i = 0; i < arrayLength; i++){
        for(let j = 0; j < arrayLength - i - 1; j++){
            animations.push([j, j + 1]);
            if(array[j] > array[j + 1]){
                animations.push([j, j + 1]);
                swap(array, j, j + 1);
            }  
        }
    }
    return animations;
}

function swap(array, a, b){
    return [array[a], array[b]] =[array[b], array[a]]
}