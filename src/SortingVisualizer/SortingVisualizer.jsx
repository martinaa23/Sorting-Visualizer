import React, { Component } from "react";
import './SortingVisualizer.css';
import { getBubbleSortAnimations } from '../Algorithms/bubbleSort';
import { quickSort } from "../Algorithms/quickSort";
import { getMergeSortAnimations} from "../Algorithms/mergeSort";


const NUMBER_OF_ARRAY_BARS = 100;
const ANIMATION_SPEED = 3;

class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Array to be sorted
            array: [],
            swapIndices: [], 
            sorting: false,
            primaryColor: "aqua",
            secondaryColor: "red",
            barStyles: []
        };
    }

    componentDidMount(){
        // Initialize the array with random values
        this.resetArray();
        
    }
    
    resetArray(){
        const array = []
        const barStyles = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            // Generate random values 
            array.push(randomIntFromInterval(5, 730)); 
            barStyles.push({height: `${array[i]}px`, backgroundColor: this.state.primaryColor});
        }
        this.setState({array, barStyles})
    }


    bubbleSort() {
        // Set sorting state to true to disable the buttons while sorting
        this.setState({sorting: true});
        
        // Sort the array with bubble sort
        const animations = getBubbleSortAnimations(this.state.array);
        let animationIdx = 0;

        const animate = () => {
            if (animationIdx < animations.length){
                const [action, barIdx1, barIdx2] = animations[animationIdx];
                const isColorChange = action === "comparison1" || action === "comparison2";

                const newBarStyles = [...this.state.barStyles];

                if (isColorChange){
                    const color = action === "comparison1" ? this.state.secondaryColor : this.state.primaryColor;
                    
                    newBarStyles[barIdx1] = {...newBarStyles[barIdx1], backgroundColor : color};
                    newBarStyles[barIdx2] = {...newBarStyles[barIdx2], backgroundColor : color};

                } else {
                    const newHeight = animations[animationIdx][2];
                    newBarStyles[barIdx1] = {...newBarStyles[barIdx1], height: `${newHeight}px`};
                }
                this.setState({barStyles: newBarStyles});
                animationIdx++;
                setTimeout(animate, ANIMATION_SPEED);
            } else {
                this.setState({sorting: false});
            }
        };

        animate();
    }
    

    quickSort(){
        this.state({sorting: true})
        // Quick sort animation logic here
        this.state({sorting: false})
    }

    mergeSort(){
        this.setState({sorting: true})
        
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName("array-bar");
          const ifColorChange = i % 3 !== 2;
          if (ifColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? this.secondaryColor : this.primaryColor;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * this.animationSpeed);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * this.animationSpeed);
          }
        }

        this.setState({sorting: false});
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
            // const sortedArray = mergeSort([...array]);
            const javascriptSortedArray = array.slice().sort((a, b) => a - b);

            // console.log(arraysAreEqual(javascriptSortedArray, sortedArray));
        }
    }   

    // Render the array as well as buttons
    render(){
        // Get the current state of array, sorting
        const { array, sorting, barStyles } = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                    className="array-bar"
                    key={idx}
                    style={barStyles[idx]}>
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

