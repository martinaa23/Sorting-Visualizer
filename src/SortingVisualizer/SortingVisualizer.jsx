import React, { Component } from "react";
import './SortingVisualizer.css';

class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Array to be sorted
            array: [],
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
            array.push(randomIntFromInterval(5, 500)); 
        }
        this.setState({array})
    }

    // Implement bublesorting algorithm
    async bubbleSort(array){
        let arrayLength = array.length;
        for(let i = 0; i < arrayLength - 1; i++){
            for(let j = 0; j < arrayLength - i - 1; j++){
                if(array[j] > array[j + 1]){
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
                this.setState({array: [...array]});

                await new Promise((resolve) => setTimeout(resolve, 1));
            }
        }
        this.setState({array})  
    }

    render(){
        const { array } = this.state;

        return (
            <div className="array-containter">
                {array.map((value, idx) => (
                <div
                    className="array-bar"
                    key={idx}
                    style={{height: `${value}px`}}>
                    </div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort(array)}>Bubble Sort</button>
                {/*Add more sorting algorithms*/}
            </div>
        );
    }
}

// Helper function to generate random integers within a range
function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;

