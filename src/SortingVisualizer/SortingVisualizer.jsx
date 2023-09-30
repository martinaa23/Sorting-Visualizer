import React, { Component } from "react";
import './SortingVisualizer.css';
import { bubbleSort } from '../Algorithms/bubbleSort';
import { quickSort } from "../Algorithms/quickSort";


const NUMBER_OF_ARRAY_BARS = 100;
const ANIMATION_SPEED = 50;

class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Array to be sorted
            array: [],
            swapIndices: [], 
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
        // const animations = bubbleSort([...this.state.array]);
        // this.setState({sorting: true});  
        // let i = 0;
        // const animateSort = () => {
        //     if(i >= animations.length){
        //         this.setState({sorting: false, array: animations[animations.length - 1]});
        //         return;
        //     }

        //     const [firstIdx, secondIdx] = animations[i];
        //     const newArray = [...this.state.array];
        //     const temp = newArray[firstIdx];
        //     newArray[firstIdx] = newArray[secondIdx];
        //     newArray[secondIdx] = temp;

        //     this.setState({array: newArray, swapIndices: [firstIdx, secondIdx]})
        //     i++;
        //     setTimeout(animateSort, ANIMATION_SPEED);
        // };

        // animateSort();
    }

    quickSort(){

    }


    testSortingAlgorithms(){
        for(let i = 0; i < 100; i++){
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for(let j = 0; j < length; j++){
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javascriptSortedArray = array.slice().sort((a, b) => a - b);
            const sortedArray = quickSort([...array]);

            console.log(arraysAreEqual(javascriptSortedArray, sortedArray));
        }
    }   

    render(){
        const { array, swapIndices, sorting } = this.state;

        return (
            <div className="array-container">
                {array.map((values, idx) => (
                    <div 
                    className={`array-bar ${swapIndices.includes(idx) ? "highlighted" : ""}`}
                    key={idx}
                    style={{height: `${values}px`}}></div>
            ))}
                <div className={`button-container ${sorting ? 'disabled' : ''}`}>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onclick={() => this.quickSort()}>Quick Sort</button>
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

