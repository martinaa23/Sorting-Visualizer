import React, { Component } from "react";

class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Array to be sorted
            array: []
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

    bubbleSort(){
        // Implement bublesorting algorithm
    }

    render(){
        const { array } = this.state;

        return (
            <div className="sorting-visualizer">
                {array.map((value, idx) => (
                <div
                    className="array-bar"
                    key={idx}
                    style={{height: '${value}px'}}
                ></div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
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

