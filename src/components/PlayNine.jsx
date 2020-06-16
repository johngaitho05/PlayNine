import React, { Component } from "react";
import "./PlayNine.css";

class Stars extends Component {
  render() {
    const stars = () => {
      let starsList = [];
      for (let i = 0; i < this.props.numStars; i++) {
        starsList.push(
            <span key={i}>
            <i className="fas fa-star"/>
          </span>
        );
      }
      return starsList;
    };
    return <div className="card board">{stars()}</div>;
  }
}
class Buttons extends Component {
  state = {};
  getStyleClass = (stage) => {
    return stage === 0
        ? "btn btn-danger"
        : stage === 1
            ? "btn btn-success"
            : "btn btn-primary";
  };
  getIconClass = (stage) => {
    return stage === 0
        ? "fas fa-times"
        : stage === 1
            ? "fas fa-check"
            : "fas fa-equals";
  };
  render() {
    const numOfSeleted = this.props.selected.length;
    const stage = this.props.stage;
    const design = this.getStyleClass(stage);
    const icon = this.getIconClass(stage);
    return (
        <div className="buttons">
          <button
              className={design}
              onClick={this.props.onEvaluate}
              disabled={
                stage === 2 || stage === 3 || (numOfSeleted === 0 && stage === -1)
              }
          >
            <i className={icon}/>
          </button>
          <button
              className="btn btn-warning"
              onClick={this.props.onRedraw}
              disabled={this.props.turns === 0 || this.props.stage>1}
          >
            {this.props.turns} &nbsp;
            <i className="fas fa-sync-alt"/>
          </button>
        </div>
    );
  }
}

class Result extends Component {
  render() {
    const selectedNums = () => {
      let nums = this.props.selected;
      let selected = [];
      for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        selected.push(
            <span
                className="number"
                key={num}
                onClick={() => this.props.onDeselect(num)}
            >
            {num}
          </span>
        );
      }
      return selected;
    };

    return <div className="card result">{selectedNums()}</div>;
  }
}
class NumbersBoard extends Component {
  render() {
    const stage = this.props.stage;
    const compliments = ["Congrats", "Well done!", "Excellent!" ];
    let congratsMsg = compliments[Math.floor(Math.random() * 3)];
    if (stage === 3) {
      return (
          <div className="card numbers">
            <p style={{color:'#03ad5b'}}>{congratsMsg}</p>
            <button className="btn btn-default" onClick={this.props.onRestart}>
              Play Again
            </button>
          </div>
      );
    } else if (stage === 2) {
      return (
          <div className="card numbers">
            <p style={{color:'#ff2f0d'}}>Game Over</p>
            <button className="btn btn-default" onClick={this.props.onRestart}>
              Play Again
            </button>
          </div>
      );
    } else {
      const numbers = () => {
        let elements = [];
        for (let i = 1; i <= 9; i++) {
          elements.push(
              <span
                  key={i}
                  className={this.props.used.includes(i) ? "number used" :
                      this.props.selected.includes(i) ? "number selected" : "number"}
                  onClick={() => this.props.onSelect(i)}
              >
              {i}
            </span>
          );
        }
        return elements;
      };
      return <div className="card numbers">{numbers()}</div>;
    }
  }
}

class PlayNine extends Component {
  state = {
    numStars: Math.floor(Math.random() * 8) + 1,
    selected: [],
    used: [],
    stage: -1, //-1 = playing 0 = wrong, 1= right, 2= game over
    turns: 10,
  };

  handleRedraw = () => {
    if (this.state.turns > 0 && this.state.stage<2) {
      this.setState({ turns: this.state.turns - 1 });
      this.updateStars();
    }
  };

  handleSelect = (number) => {
    if (
        !this.state.used.includes(number) &&
        !this.state.selected.includes(number)
    ) {
      this.setState({ selected: this.state.selected.concat(number) });
    }
    this.setState({ stage: -1 });
  };

  handleDeselect = (number) => {
    let selected = this.state.selected;
    selected.splice(selected.indexOf(number), 1);
    this.setState({ selected }, function () {
      this.setState({ stage: -1 });
    });
  };
  handleEvaluate = () => {
    if (this.state.stage === -1 && this.state.selected.length > 0) {
      const total = this.state.selected.reduce(function (a, b) {
        return a + b;
      }, 0);
      if (total === this.state.numStars) {
        this.setState({stage: 1 });
      } else {
        this.setState({ stage: 0 },function(){
          this.updateSelected();
        });
      }
    } else if (this.state.stage === 1) {
      this.setState({ used: this.state.used.concat(this.state.selected), stage: -1 },function(){
        this.checkDoneStatus();
        this.updateSelected();
        this.updateStars();
      });
    }
  };
  updateSelected = ()=>{
    this.setState({selected:[]})
  };
  checkDoneStatus = () => {
    if(!this.checkWin()){
      this.checkLose();
    }
  };
  updateStars = () => {
    this.setState({ numStars: Math.floor(Math.random() * 8) + 2 }, function () {
      this.checkDoneStatus();
    });
  };
  handleRestart = () => {
    this.setState({ used: [], selected:[],stage:-1,turns:10 },function(){
      this.updateStars();
    });
  };
  checkWin = () => {
    if (this.state.used.length === 9) {
      this.setState({ stage: 3,selected: []});
      return true;
    }
  };

  checkLose = () => {
    if (this.state.turns === 0 && this.outOfMoves()) {
      this.setState({ stage: 2,selected: [] });
    }
  };

  outOfMoves = () => {
    let target = this.state.numStars;
    let nums = [];
    for (let i = 1; i < 10; i++) {
      if (i <= this.state.numStars && !this.state.used.includes(i))
        nums.push(i);
    }
    console.log(nums, target);
    return !this.sumAvailable(nums, target);
  };
  sumAvailable = (allNums, target) => {
    if (allNums.includes(target)) return true;
    let nums = allNums.filter((num) => num <= target);
    if (nums.length < 2) return false;
    if (nums.length === 2) return nums[0] + nums[1] === target;
    return (
        this.sumAvailable(nums.slice(1, nums.length), target - nums[0]) ||
        this.sumAvailable(nums.slice(1, nums.length), target)
    );
  };

  render() {
    return (
        <div className="text-center wrapper">
          <h3>Welcome to PlayNine</h3>
          <div className="container game-container">
            <Stars numStars={this.state.numStars} />
            <Buttons
                onEvaluate={this.handleEvaluate}
                stage={this.state.stage}
                onRedraw={this.handleRedraw}
                turns={this.state.turns}
                selected={this.state.selected}
            />
            <Result
                selected={this.state.selected}
                used={this.state.used}
                onDeselect={this.handleDeselect}
            />
          </div>
          <NumbersBoard
              used={this.state.used}
              onSelect={this.handleSelect}
              message={this.state.message}
              info={this.state}
              onRestart={this.handleRestart}
              stage={this.state.stage}
              selected = {this.state.selected}
          />
        </div>
    );
  }
}

export default PlayNine;
