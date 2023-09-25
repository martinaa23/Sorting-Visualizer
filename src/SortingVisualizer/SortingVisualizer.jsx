import React, { Component } from "react";
import './SortingVisualizer.css';

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

        for(let i = 0; i < 50; i++){
            // Generate random values 
            array.push(randomIntFromInterval(5, 500)); 
        }
        this.setState({array})
    }

    // Implement bublesorting algorithm
    async bubbleSort(array){
        let highlightedIndices = [];
        let arrayLength = array.length;
        this.setState({sorting: true});

        for(let i = 0; i < arrayLength - 1; i++){
            for(let j = 0; j < arrayLength - i - 1; j++){
                if(array[j] > array[j + 1]){
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    highlightedIndices = [j, j + 1];
                }


                this.setState({
                    highlightedIndices: [...highlightedIndices],
                    array: [...array]
                
                });
                
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }
        this.setState({
            highlightedIndices: [],
            array: [...array]  
        });
        this.setState({sorting: false})
    }

    

    render(){
        const { array, highlightedIndices, sorting } = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                <div
                    className={`array-bar ${highlightedIndices.includes(idx) ? 'highlighted' : ''}`} 
                    key={idx}
                    style={{height: `${value}px`}}>
                    </div>
                ))}
                <div className={sorting ? 'disabled' : ''}>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort(array)}>Bubble Sort</button>
                {/*Add more sorting algorithms*/}
                </div>
            </div>
        );
    }
}

// Helper function to generate random integers within a range
function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;

