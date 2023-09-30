export const quickSort = (array, low = 0, high = array.length - 1) => {
    if(low < high){
    let partitionIdx = partition(array, low, high);
    quickSort(array, low, partitionIdx - 1);
    quickSort(array, partitionIdx + 1, high);
    }

    return array;
}

function partition(array, low, high){
    let pivot = array[high];
    let i = low - 1;
    for(let j = low; j <= high - 1; j++){
        if(array[j] < pivot){
            i++;
            swap(array, i, j);
        }
    }
    swap(array, i + 1, high);
    return i + 1;

}


function swap(array, a, b){
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}