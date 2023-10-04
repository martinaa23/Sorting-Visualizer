import React, { Component } from "react";
import './SortingVisualizer.css';
import { getBubbleSortAnimations } from '../Algorithms/bubbleSort';
import { quickSort } from "../Algorithms/quickSort";
import { mergeSort } from "../Algorithms/mergeSort";


const NUMBER_OF_ARRAY_BARS = 100;
const ANIMATION_SPEED = 5;

class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Array to be sorted
            array: [],
            swapIndices: [], 
            sorting: false,
            primaryColor: "aqua",
            secondaryColor: "red"
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


    bubbleSort() {
        // Set sorting state to true to disable the buttons while sorting
        this.setState({sorting: true});
        
        // Sort the array with bubble sort
        let animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange =
                animations[i][0] === "comparison1" ||
                animations[i][0] === "comparison2";
            
            const arrayBars = document.getElementsByClassName("array-bar");
            if (isColorChange) {
                // Determine the color based on the comparison 
                const color =
                animations[i][0] === "comparison1"
                ? this.state.secondaryColor
                : this.state.primaryColor;

                const [, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                const [, barIdx, newHeight] = animations[i];
    
                if (barIdx === -1 ) {
                    continue;
                }
    
                const barStyle = arrayBars[barIdx].style;
                barStyle.backgroundColor = "purple";
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
        this.setState({sorting: false});
    }
    

    quickSort(){
    }

    mergeSort(){
    }


    testSortingAlgorithms(){
        // Generate 100 arrays with a random length between 1 and 1000
        for(let i = 0; i < 100; i++){
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            // Populate the array with random values between -1000 and 1000
            for(let j = 0; j < length; j++){
                array.push(randomIntFromInterval(-1000, 1000));
            }
            // Sort the array using defined sorting method and compare it to built in js sort
            const sortedArray = mergeSort([...array]);
            const javascriptSortedArray = array.slice().sort((a, b) => a - b);

            console.log(arraysAreEqual(javascriptSortedArray, sortedArray));
        }
    }   

    // Render the array as well as buttons
    render(){
        // Get the current state of array, sorting
        const { array, sorting } = this.state;

        return (
            <div className="array-container">
                {array.map((values, idx) => (
                    <div 
                    className="array-bar"
                    key={idx}
                    style={{height: `${values}px`}}>
                    </div>
            ))}

                <div className={`button-container ${sorting ? 'disabled' : ''}`}>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
                </div>
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

