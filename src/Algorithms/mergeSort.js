export const mergeSort = (array) =>{
    // Base case  
    if(array.length <= 1) return array;

    
    let middle = Math.floor(array.length / 2);
    
    // recursive calls
    let left = mergeSort(array.slice(0, middle));
    let right = mergeSort(array.slice(middle));

    return merge(left, right);
}

function merge(left, right){
    // Initialized the array to hold the sorted items
    let sortedArray = [];

    while(left.length && right.length){
        // Insert the smallest item into sortedArray
        if(left[0] < right[0]){
            sortedArray.push(left.shift())
        }else{
            sortedArray.push(right.shift())
        }
    }

    // Using the spread operators create a new array by combining all three arrays
    return [...sortedArray, ...left, ...right];
}