import React, {useState} from 'react';
import { 
  Button,
  TouchableOpacity,
  StyleSheet, 
  Text, 
  View, 
  Alert
} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';

const Square = (props) => {
  return (
    <TouchableOpacity
      style={styles.square}
      onPress={props.onPress}
    >
      <Text style={styles.squareText}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
}

const Board = (props) => {
  const renderSquare = (i) => {
    return (
      <Square 
        value={props.squares[i]} 
        onPress={()=> {props.onPress(i)}}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={100}
        data={[0,1,2,3,4,5,6,7,8]}
        renderItem={({ item }) => (
          renderSquare(item)
        )}
      />
    </View>
  )
}

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X': 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  handleReset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });
  }
  
  render() {
    const squares = this.state.squares.slice();
    return (
      <View style={styles.container}>
        <Board 
          squares={squares}
          onPress={(i)=>this.handleClick(i)}
        />
        <Button 
        onPress={()=>this.handleReset()}
        title='Reset'
        />
      </View>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {'winner': squares[a], 'winSquares': lines[i]};
    }
  }
  return {'winner': null, 'WinSquares': null};
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        color: 'blue',
        justifyContent: "center",
        alignItems: "center"
    },

    squareText: {
      fontWeight: 'bold',
      fontSize: 50,
    },
    
    square: {
      backgroundColor: 'white',
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 60
    }
});

export default Game;
