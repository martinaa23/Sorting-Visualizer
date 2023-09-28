export const bubbleSort = array => {
    const arrayLength = array.length;

    if(arrayLength === 1) return array;

    for(let i = 0; i < arrayLength; i++){
        for(let j = 0; j < arrayLength - i - 1; j++){
            if(array[j] > array[j + 1]){
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }    
        }
    }
    return array;
}

