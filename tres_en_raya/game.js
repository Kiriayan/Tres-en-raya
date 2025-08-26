class TicTacToe extends Phaser.Scene {
    constructor() {
      super({ key: 'TicTacToe' });
      this.board = [['', '', ''], ['', '', ''], ['', '', '']];
      this.currentPlayer = 'X';
      this.cellSize = 150;
      this.offsetX = 50;
      this.offsetY = 50;
      this.gameOver = false;
    }
  
    preload() {}
  
    create() {
      this.drawGrid();
      this.input.on('pointerdown', this.handleClick, this);
  
      // Texto para mostrar el turno
      this.turnText = this.add.text(50, 500, `Turno: ${this.currentPlayer}`, {
        fontSize: '28px',
        color: '#fff',
      });
    }
  
    drawGrid() {
      const graphics = this.add.graphics();
      graphics.lineStyle(5, 0xffffff);
  
      // Líneas verticales
      graphics.moveTo(this.offsetX + this.cellSize, this.offsetY);
      graphics.lineTo(this.offsetX + this.cellSize, this.offsetY + this.cellSize * 3);
      graphics.moveTo(this.offsetX + this.cellSize * 2, this.offsetY);
      graphics.lineTo(this.offsetX + this.cellSize * 2, this.offsetY + this.cellSize * 3);
  
      // Líneas horizontales
      graphics.moveTo(this.offsetX, this.offsetY + this.cellSize);
      graphics.lineTo(this.offsetX + this.cellSize * 3, this.offsetY + this.cellSize);
      graphics.moveTo(this.offsetX, this.offsetY + this.cellSize * 2);
      graphics.lineTo(this.offsetX + this.cellSize * 3, this.offsetY + this.cellSize * 2);
  
      graphics.strokePath();
    }
  
    handleClick(pointer) {
      if (this.gameOver) return;
  
      const col = Math.floor((pointer.x - this.offsetX) / this.cellSize);
      const row = Math.floor((pointer.y - this.offsetY) / this.cellSize);
  
      if (col < 0 || col > 2 || row < 0 || row > 2) return;
  
      if (this.board[row][col] === '') {
        this.board[row][col] = this.currentPlayer;
        this.drawSymbol(col, row);
  
        if (this.checkWin(this.currentPlayer)) {
          this.showWinner(`${this.currentPlayer} gana!`);
          this.gameOver = true;
        } else if (this.isBoardFull()) {
          this.showWinner('Empate');
          this.gameOver = true;
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
          this.turnText.setText(`Turno: ${this.currentPlayer}`);
        }
      }
    }
  
    drawSymbol(col, row) {
      const centerX = this.offsetX + col * this.cellSize + this.cellSize / 2;
      const centerY = this.offsetY + row * this.cellSize + this.cellSize / 2;
  
      if (this.currentPlayer === 'X') {
        this.add.text(centerX - 25, centerY - 30, 'X', {
          fontSize: '60px',
          color: '#ff4c4c',
        });
      } else {
        this.add.text(centerX - 25, centerY - 30, 'O', {
          fontSize: '60px',
          color: '#4cff4c',
        });
      }
    }
  
    checkWin(player) {
      for (let i = 0; i < 3; i++) {
        if (
          this.board[i][0] === player &&
          this.board[i][1] === player &&
          this.board[i][2] === player
        )
          return true;
  
        if (
          this.board[0][i] === player &&
          this.board[1][i] === player &&
          this.board[2][i] === player
        )
          return true;
      }
  
      if (
        this.board[0][0] === player &&
        this.board[1][1] === player &&
        this.board[2][2] === player
      )
        return true;
  
      if (
        this.board[0][2] === player &&
        this.board[1][1] === player &&
        this.board[2][0] === player
      )
        return true;
  
      return false;
    }
  
    isBoardFull() {
      return this.board.flat().every((cell) => cell !== '');
    }
  
    showWinner(message) {
      this.add.text(50, 550, message, {
        fontSize: '32px',
        color: '#ffff00',
      });
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 550,
    height: 600,
    backgroundColor: '#1e1e1e',
    scene: TicTacToe,
  };
  
  const game = new Phaser.Game(config);
  