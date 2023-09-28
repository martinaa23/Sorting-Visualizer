import React, { Component } from "react";
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms';
import { wait } from "@testing-library/user-event/dist/utils";

const NUMBER_OF_ARRAY_BARS = 100;

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
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            // Generate random values 
            array.push(randomIntFromInterval(5, 730)); 
        }
        this.setState({array})
    }


    async bubbleSort(){   
        const sortedArray = await sortingAlgorithms.bubbleSort([...this.state.array]);
        for(let i = 0; i < sortedArray.length; i++){
            setTimeout(() => {
                this.setState({array: sortedArray.slice(0, i + 1)});
            }, i * 100);
        }

        const javascriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
        // const sortedArray = sortingAlgorithms.bubbleSort(this.state.array);




        // console.log(arraysAreEqual(javascriptSortedArray, sortedArray));
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

function swap(array, a, b){
    return [array[a], array[b]] =[array[b], array[a]]
}

const Wait =(t,f) => new Promise(() => setTimeout(f,t))

async function Test(){
     Wait(1000, ()=> console.log("Test ran"))
}

Test()

export default SortingVisualizer;

