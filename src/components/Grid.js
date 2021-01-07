import React, { Component } from 'react';
import Square from './Square';

class Grid extends Component {
  state = { squares: [], size: 5 };

  componentDidMount() {
    this.setState({ grid: this.initializeGrid() });
  }

  initializeGrid = () => {
    const { size } = this.state;
    const arrOfN = (n, s) => Array.from(Array(n).keys()).map(a => a + s);
    const squares = arrOfN(size, 0).map((v, i) =>
      arrOfN(size, size * i).map((v, i) => ({ i: v, v: null })),
    );
    this.setState({ squares: squares });
  };

  checkGameState = () => {
    let status = 'Game is on!';
    const squareRows = this.state.squares;
    const columnsToRows = this.state.squares.map((row, y, arr) => {
      const transpose = row.map((square, x) => {
        return arr[x][y];
      });
      return transpose;
    });

    const winningRows = [...squareRows, ...columnsToRows];

    for (let row of winningRows) {
      if (row.filter(x => x.v === 'X').length === this.state.size) {
        status = `X is winner!`;
      }
      if (row.filter(x => x.v === 'O').length === this.state.size) {
        status = 'O is winner!';
      }
    }

    return status;
  };

  computerSelect() {
    const squares = this.state.squares.slice();
    const freeIndexes = squares
      .map((row, rowI) => {
        const indexes = row.map((square, i) => {
          if (square.v === null) return [rowI, i];
          return null;
        });
        return indexes.filter(x => x);
      })
      .flat();

    if (freeIndexes.length > 1) {
      const [row, col] = [
        ...freeIndexes[Math.floor(Math.random() * freeIndexes.length)],
      ];
      squares[row][col].v = 'O';
      this.setState({ squares: squares });
    }
  }

  handleClick(row, col) {
    const squares = this.state.squares.slice();
    const sValue = squares[row][col].v;
    if (sValue === null) {
      squares[row][col].v = 'X';
      this.setState({ squares: squares }, () => this.computerSelect());
    }
  }

  renderSquare(row, col) {
    const value = this.state.squares[row][col].v;
    return (
      <Square
        key={'' + row + col}
        value={value}
        onClick={() => this.handleClick(row, col)}
      />
    );
  }

  render() {
    const status = this.checkGameState();

    return (
      <div>
        <div className="segment ui five column grid">
          {this.state.squares.map((row, rowI) =>
            row.map((square, sI) => this.renderSquare(rowI, sI)),
          )}
        </div>
        <div className="segment">{status}</div>
      </div>
    );
  }
}

export default Grid;
