import React, { Component } from "react";
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms';


class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Array to be sorted
            array: [],
            highlightedIndices: [], 
            sorting: false,
        };
    }

    componentDidMount(){
        // Initialize the array with random values
        this.resetArray();
        
    }

    resetArray(){
        const array = []
        for(let i = 0; i < 100; i++){
            // Generate random values 
            array.push(randomIntFromInterval(5, 730)); 
        }
        this.setState({array})
    }


    bubbleSort(){
        const javascriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
        const sortedArray = sortingAlgorithms.bubbleSort(this.state.array);
        console.log(arraysAreEqual(javascriptSortedArray, sortedArray));
    }

    testSortingAlgorithms(){
        for(let i = 0; i < 100; i++){
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for(let j = 0; j < length; j++){
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javascriptSortedArray = array.slice().sort((a, b) => a - b);
            const sortedArray = sortingAlgorithms.bubbleSort(array.slice());
            console.log(arraysAreEqual(javascriptSortedArray, sortedArray));
        }
    }   

    render(){
        const { array } = this.state;

        return (
            <div className="array-container">
                {array.map((values, idx) => (
                    <div 
                    className="array-bar" 
                    key={idx}
                    style={{height: `${values}px`}}></div>
            ))}
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
            </div>
        );   
    }
}

// Helper function to generate random integers within a range
function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Helper function to check if arrays are equal
function arraysAreEqual (arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false; // no issues with length
    
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    
    return true;
}

export default SortingVisualizer;

