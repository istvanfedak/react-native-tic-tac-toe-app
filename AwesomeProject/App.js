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
  const squareStyle = (props.highlight? [styles.square, styles.win] : [styles.square])
  return (
    <TouchableOpacity
      style={squareStyle}
      onPress={props.onPress}
    >
      <Text style={styles.squareText}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
}

const ResetButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.resetButton}
      onPress={props.onPress}
    >
      <Text style={styles.resetButtonText}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
}

const Board = (props) => {

  const renderResetButton = () => {
    return (
      <ResetButton
        value={'RESET'} 
        onPress={()=> {props.handleReset()}}
      />
    );
  }

  const renderSquare = (i) => {
    const winSquares = props.winSquares;
    const onPress = props.onPress
    if(i == 9) return <View></View> // skip a button to center reset button
    if(i == 10) return (renderResetButton());

    return (
      <Square 
        value={props.squares[i]} 
        onPress={()=> {props.onPress(i)}}
        highlight={winSquares && winSquares.includes(i)}
      /> 
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatGrid
        style={styles.flatGrid}
        itemDimension={85}
        data={[0,1,2,3,4,5,6,7,8,9,10]}
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
    const winInfo = calculateWinner(squares);
    return (
      <View style={styles.container}>
        <Board 
          squares={squares}
          onPress={(i)=>this.handleClick(i)}
          handleReset={()=>this.handleReset()}
          winSquares={winInfo.winSquares}
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
        backgroundColor: 'white',
        color: 'blue',
        justifyContent: "center",
        alignItems: "center"
    },

    flatGrid: {
      marginTop: 160,
      width: 300,
      flex: 1,
    },

    squareText: {
      fontWeight: 'bold',
      fontSize: 50,
    },
    
    square: {
      backgroundColor: 'rgb(229, 229, 229)',
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
      borderColor: 'rgb(229, 229, 229)',
      borderWidth: 2,
      borderRadius: 40
    },

    win: {
      backgroundColor: '#82F2A7',
      borderColor: '#82F2A7'
    },

    resetButtonText: {
      fontWeight: 'bold',
      fontSize: 17,
    },

    resetButton: { 
      backgroundColor: '#82F2A7',
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
      borderColor: '#82F2A7',
      borderWidth: 2,
      borderRadius: 40
    },
});

export default Game;
