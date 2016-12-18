/**
 *
 * Author : Sepehr Aliakbary
 * A class that Holds Snake Component ...
 *
 * @class Snake
 */
let Snake = (function () {
    'use strict';
    function Snake(head, tail) {
        // enforces new
        if (!(this instanceof Snake)) {
            return new Snake(head, tail);
        }
        let _head = head;
        let _tail = tail;
        this.getHead = function () {
            return _head;
        }

        this.getTail = function () {
            return _tail;
        }
    }
    Snake.prototype.eat = function (player) {
        if (player instanceof Player) {
            if (this.getHead() != player.getPosition()) throw Error("Position mismatch");
            console.log("Snake bit %s", player.name);
            console.log(player.name, " moving down to: ", 1);
            player.setPosition(1);
            player.incrementSnakeEncounterCount();
        } else {
            throw Error("Snake only eats Player");
        }
    };
    return Snake;
}());
let snakes = new Array();

/**
 *
 * Author : Sepehr Aliakbary
 * A class that Holds Player Component ...
 *
 * @class Player
 */
let Player = (function () {
    'use strict';
    function Player(name) {
        // enforces new
        if (!(this instanceof Player)) {
            return new Player(name);
        }
        // constructor body
        this.name = name;
        var _position = 0;
        var _nThrows = 0;
        var _sixCount = 0;
        var _nLaddersClimbed = 0;
        var _nSnakeEncountered = 0;
        this.setPosition = function (position) {
            _position = position;
        };
        this.getPosition = function () {
            return _position;
        };
        this.incrementThrowCount = function () {
            _nThrows++;
        };
        this.getThrowCount = function () {
            return _nThrows;
        };
        this.incrementSixCount = function () {
            _sixCount++;
        };
        this.getSixCount = function () {
            return _sixCount;
        };
        this.incrementLadderClimbedCount = function () {
            _nLaddersClimbed++;
        };
        this.getLadderClimbedCount = function () {
            return _nLaddersClimbed;
        };
        this.incrementSnakeEncounterCount = function () {
            _nSnakeEncountered++;
        };
        this.getSnakeEncounterCount = function () {
            return _nSnakeEncountered;
        };
    }
    Player.prototype.bestThrows = function (position) {
        let bestThrows = [];

        let snakes = arguments[1];
        let ladders = arguments[2];

        if (!snakes || !ladders) {
            console.warn("Pass necessary parameters. e.g. snakes,ladders,etc.");
            return [];
        }

        let visited = [];
        let i = 0;

        for (i = 0; i < 100; i++) {
            visited[i] = false;
        }

        let queue = []; // JS queue using array's Array.prototype.shift() method

        queue.push(position - 1);

        while (queue.length > 0) {
            let currentPosition = queue.shift();

            if (currentPosition == 99) break;

            for (i = currentPosition + 1; (i <= currentPosition + 6) && (i < 100); i++) {
                if (!visited[i]) {
                    visited[i] = true;

                    let connectionFlag = false;
                    snakes.forEach(function (snake) {
                        if (i == snake.getHead()) {
                            connectionFlag = true;
                            queue.push(snake.getTail());
                        }
                    });
                    ladders.forEach(function (ladder) {
                        if (i == ladder.getBottom()) {
                            connectionFlag = true;
                            queue.push(ladder.getTop());
                        }
                    });

                    if (!connectionFlag) {
                        queue.push(i);
                        bestThrows.push(i - currentPosition);
                    }
                }
            }
        }
        return bestThrows;
    }
    return Player;
}());
/**
 *
 * Author : Sepehr Aliakbary
 * A component that Holds Each Cell in GameBoard Component ...
 *
 * @component Cell
 */
const Cell = React.createClass({
    /**
     * render the Cell on page
     * @method render
     */
    render: function () {
        const col = this.props.colId;
        const row = this.props.rowId;
        const size = this.props.size;
        const width = this.props.width;
        const height = this.props.height;
        const pegs = this.props.pegs;
        const snakes = this.props.snakes;
        const position = (row % 2 == 0) ?
            ((width*height)-(row*width)-col)
            : ( (height - 1 - row) * width + col + 1);
        let renderPegs = [];
        let positionDuplicates = [];
        let i;
        for (i = 0; i < pegs.length; i++) {
            if (pegs[i].getPosition() == position) {
                positionDuplicates.push(i);
            }
        }
        let j = 0;
        positionDuplicates.forEach(function (peg) {
            renderPegs.push(<Peg key={j} pegNumber={positionDuplicates[j]}/>);
            j++;
        });
        var sneek = snakes.map(function (p) {
            return p.getHead()
        }).includes(position);
        var peeg = pegs.map(function (p) {
            return p.getPosition()
        }).includes(position);
        if (sneek) {
            if (peeg) {
                return (
                    <div style={{width: (100 / this.props.width) + "%"}} className="cell ">
                        <div className="insideCell red"><span>{position}</span>{renderPegs}</div>
                    </div>
                );
            }
            else {
                return (
                    <div style={{width: (100 / this.props.width) + "%"}} className="cell">
                        <div className="insideCell red"><span>{position}</span></div>
                    </div>
                );
            }
        }
        else {
            if (peeg) {
                return (
                    <div style={{width: (100 / this.props.width) + "%"}} className="cell">
                        <div className="insideCell"><span>{position}</span>{renderPegs}</div>
                    </div>
                );
            }
            else {
                return (
                    <div style={{width: (100 / this.props.width) + "%"}} className="cell">
                        <div className="insideCell"><span>{position}</span></div>
                    </div>
                );
            }
        }
    },
});
/**
 *
 * Author : Sepehr Aliakbary
 * A component that Holds Peg information in GameBoard Component ...
 *
 * @component Peg
 */
const Peg = React.createClass({
    /**
     * render the Peg on page
     * @method render
     */
    render: function () {
        const types = ["peg__red", "peg__green", "peg__blue", "peg__yellow"];
        const pegNumber = this.props.pegNumber;
        return (
            <div className={!isNaN(pegNumber) ? "peg " + types[pegNumber] : "peg"}></div>
        );
    },
});
/**
 *
 * Author : Sepehr Aliakbary
 * A component that informations of Row and Frid
 *
 * @components Row and Grid
 */

const Row = React.createClass({
    /**
     * render the Row DOM at html page
     * @method render
     */
    render: function () {
        var row = [];
        for (var i = 0; i < this.props.width; i++) {
            row.push(<Cell snakes={this.props.snakes} key={i} rowId={this.props.rowId} colId={i}
                           width={this.props.width} height={this.props.height}
                           size={this.props.size}
                           pegs={this.props.pegs}/>);
        }
        return (
            <div className="row">
                {row}
            </div>
        );
    },
});
const Grid = React.createClass({
    /**
     * render the Grid DOM at html page
     * @method render
     */
    render: function () {
        var rows = [];
        for (var i = 0; i < this.props.height; i++) {
            rows.push(<Row snakes={this.props.snakes}
                           width={this.props.width} height={this.props.height}
                           key={i} rowId={i} num={this.props.height} size={this.props.width * this.props.height}
                           pegs={this.props.pegs}/>);
        }
        return (
            <div className="grid columns eight">
                {rows}
            </div>
        );
    },
});
/**
 *
 * Author : Sepehr Aliakbary
 * A component that Holds Dice Information in GameBoard Component ...
 *
 * @component Dice
 */
const Dice = React.createClass({
    /**
     * handle click button to throw the dice
     * @method handleClick
     */
    handleClick: function () {
        this.props.throwDice();
    },
    /**
     * render the dice DOM at html page
     * @method render
     */
    render: function () {
        return (
            <div className="dice columns four">
                <p style={{textAlign: 'center'}}>{this.props.value}</p>
                <div className="dice-container">
                    <div className="rollDice" id="dice-1">⚀</div>
                    <div className="rollDice" id="dice-2">⚁</div>
                    <div className="rollDice" id="dice-3">⚂</div>
                    <div className="rollDice" id="dice-4">⚃</div>
                    <div className="rollDice" id="dice-5">⚄</div>
                    <div className="rollDice" id="dice-6">⚅</div>
                </div>
                <button className="btn green" type="button" style={{margin: 'auto', display: 'block'}}
                        onClick={this.handleClick}>تاس بنداز
                </button>
            </div>
        );
    },
});
/**
 *
 * Author : Sepehr Aliakbary
 * A component that Holds Timer Component ...
 *
 * @component Timer
 */

let Timer = React.createClass({
    /**
     * Returns Methods that runs when document is ready...
     * @method getInitialState
     */
    getInitialState: function(){
        return { elapsed: 0 };
    },
    /**
     * component states when this component initialize
     * @method componentDidMount
     */
    componentDidMount: function(){
        this.timer = setInterval(this.tick, 50);
    },
    /**
     * component states after this component changes
     * @method componentDidMount
     */
    componentWillUnmount: function(){

        clearInterval(this.timer);
    },
    /**
     * count up the timer and change state
     * @method tick
     */
    tick: function(){
        this.setState({elapsed: new Date() - this.props.start});
    },
    /**
     * render the Timer on page
     * @method render
     */
    render: function() {

        var elapsed = Math.round(this.state.elapsed / 100);

        var seconds = (elapsed / 10).toFixed(0);
        return <div>زمان : <span id="myTime">{seconds}</span></div>;
    }
});

/**
 *
 * Author : Sepehr Aliakbary
 * A component that Holds GameBoard Component ...
 *
 * @component GameBoard
 */

const GameBoard = React.createClass({
    /**
     * Returns Methods that runs when document is ready...
     * @method getInitialState
     */
    getInitialState: function () {
        return {
            status: 0, 	//0-Init,1-Started,2-Finished
            notification: "بازی در حال شروع شدن می باشد",
            nPlayers: 2,
            multiplayer: false,
            dice: 'شروع کن !',
            pegs: [new Player("Player"), new Player("CPU")],
            activePlayer: 0,
            sixRepeated: 0,
            width: 0,
            height: 0,
            difficult: 1
        };
    },
    /**
     * Returns a random number for put snakes on board randomly
     * @method getRandomInt
     */
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    /**
     * run the game with the data that we give to application
     * @method startGame
     */
    startGame: function (e) {
        e.preventDefault();
        let radios = document.getElementsByName('gameMode');
        let difficultradios = document.getElementsByName('difficult');
        let width = document.getElementById('width').value;
        let height = document.getElementById('height').value;
        if(width>8){
            document.getElementById('container').style.width = 95+"%";
        }
        let gameDifficult = "";
        let flag = false;
        let gameMode = "";
        for (var i = radios.length - 1; i >= 0; i--) {
            if (radios[i].checked) {
                flag = true;
                gameMode = radios[i].value;
            }
        }

        for (var i = difficultradios.length - 1; i >= 0; i--) {
            if (difficultradios[i].checked) {
                gameDifficult = difficultradios[i].value;
            }
        }
        if (!(width < 4 || height < 4)) {

            let round = width * height;
            let rndInts = [];
            if (gameMode === "singlePlayer") {
                this.setState({
                    status: 1,
                    notification: "دو نفره",
                    width: document.getElementById('width').value,
                    height: document.getElementById('height').value,
                    difficult: parseInt(gameDifficult),
                });
            }
            else {
                this.setState({
                    status: 1,
                    notification: "چهار نفره",
                    width: document.getElementById('width').value,
                    height: document.getElementById('height').value,
                    nPlayers: 4,
                    multiplayer: true,
                    pegs: [new Player("Player 1"), new Player("Player 2"), new Player("Player 3"), new Player("Player 4")],
                    difficult: parseInt(gameDifficult)
                })
            }


            let numOfSnakess = 0;
            let diff = gameDifficult;
            if (diff == 1) {
                numOfSnakess = Math.floor(round * 0.1);
            }
            else if (diff == 2) {
                numOfSnakess = Math.floor(round * 0.2);
            }
            else if (diff == 3) {
                numOfSnakess = Math.floor(round * 0.3);
            }
            else if (diff == 4) {
                numOfSnakess = Math.floor(round * 0.4);
            }
            else {
                numOfSnakess = Math.floor(round * 0.5)
            }
            for (let i = 0; i < numOfSnakess; i++) {
                let rndInt = this.getRandomInt(2, round);
                if (!rndInts.includes(rndInt)) {
                    rndInts.push(rndInt);
                    snakes.push(new Snake(rndInt, rndInt));
                    if(!(rndInts-1&&rndInts+1)) console.log("you can't do this");
                }
                else {
                    i--;
                }
            }
        }
        else {
            alert('تعداد خانه ها نباید از 4 کمتر باشد');
        }

    },
    /**
     * update dice with a new number
     * @method updateDice
     */
    updateDice: function () {
        const number = Math.round((Math.random() * 5)) + 1;
        var self = this;
        for (var i = 1; i < document.getElementsByClassName('rollDice').length + 1; i++) {
            if (number == i) {
                document.getElementById('dice-' + i).className = "rollDice dicefadeIn";
            }
            else {
                document.getElementById('dice-' + i).className = "rollDice dicefadeOut";
            }
        }
        this.setState({
            dice: number,
        });
        setTimeout(function () {
            self.updatePegPosition(number);

        }, 1000);
    },
    /**
     * attach the timer to game board
     * @method setTimer
     */
    setTimer: function () {
        ReactDOM.render(
            <Timer start={Date.now()}/>
            ,
            document.getElementById('timer')
        );
    },
    /**
     * component states when this component initialize
     * @method componentDidMount
     */
    componentDidMount: function () {
        this.setTimer();
    },
    /**
     * update the peg position on game board
     * @method updatePegPosition
     */
    updatePegPosition: function (movement) {
        const i = this.state.activePlayer;
        let pegs = this.state.pegs;
        let width = this.state.width;
        let height = this.state.height;
        const difference = (width * height) - pegs[i].getPosition();
        console.log(pegs[i].name + "'s diff = " + difference);
        console.log(pegs[i].name + "'s position = " + pegs[i].getPosition());
        pegs[i].incrementThrowCount();
        if (movement == 6) {
            pegs[i].incrementSixCount();
        }
        if (difference <= 6) {
            if (difference == movement) {
                localStorage.setItem('name', pegs[i].name);
                localStorage.setItem('Sanake', pegs[i].getSnakeEncounterCount());
                localStorage.setItem('Time', document.getElementById('myTime').innerText);
                pegs[i].setPosition(pegs[i].getPosition() + movement);
                this.setState({
                    pegs: pegs,
                    status: 2,
                });
            }
            else {
                if (difference > movement) {
                    pegs[i].setPosition(pegs[i].getPosition() + movement);
                    this.setState({
                        pegs: pegs
                    });
                }
                else {
                    console.log(pegs[i].name + " should throw " + difference + " to win the game");
                }
            }
        } else {
            pegs[i].setPosition(pegs[i].getPosition() + movement);
            this.setState({
                pegs: pegs
            });
        }
        this.updateGame(movement);
    },
    /**
     * update the game board
     * @method updateGame
     */
    updateGame: function (dice) {
        const N = this.state.nPlayers;
        const mode = this.state.multiplayer;
        let pegs = this.state.pegs;
        let i = this.state.activePlayer;
        let sixR = this.state.sixRepeated;
        snakes.forEach(function (snake) {
            // if(snake.getHead() == pegs[i].getPosition()) pegs[i].setPosition(snake.getTail());
            if (snake.getHead() == pegs[i].getPosition()) {
                    snake.eat(pegs[i]);
            }
        });
        if (dice == 6 && sixR < 3) {
            // console.log("Best throws for " + pegs[i].name + ": " + pegs[i].bestThrows(pegs[i].getPosition(), snakes, ladders).toString());
            sixR++;
            this.setState({
                notification: pegs[i].name + " شانس مجدد دارد",
                pegs: pegs,
                sixRepeated: sixR
            })
        } else {
            i = ++i % N; // Round robin
            // console.log("Best throws for " + pegs[i].name + ": " + pegs[i].bestThrows(pegs[i].getPosition(), snakes, ladders).toString());
            let info = "نوبت : " + pegs[i].name;
            if (pegs[i].name === "CPU") {
                info += "  لطفا صبر کنید";
            }
            this.setState({
                notification: info,
                pegs: pegs,
                activePlayer: i,
                sixRepeated: 0
            });
        }
        // Simulate CPU's turn
        if (i == 1 && !mode) {
            let self = this;
            setTimeout(function () {
                self.updateDice();
            }, 1500);
        }
    },
    /**
     * render the game board on page
     * @method render
     */
    render: function () {
        const status = this.state.status;
        const pegs = this.state.pegs;
        if (status === 0) {
            return (
                <div className="intro">
                    <p style={{textAlign: 'center'}}>
                        مشخصات بازی را وارد نمایید <br/>
                    </p>
                    <form id="startgame" onSubmit={this.startGame}>
                        <div className="columns twelve text-center">
                            <img src="assets/img/snake.png" width="160"/>
                        </div>
                        <div>
                            <div className="columns twelve game-mode">
                                <div>
                                    <div className="columns six">
                                        <input id="single" className="css-checkbox" type="radio" name="gameMode"
                                               value="singlePlayer"/>
                                        <label htmlFor="single" className="css-label radGroup2">دو نفره</label>
                                    </div>
                                    <div className="columns six">
                                        <input id="multi" className="css-checkbox" type="radio" name="gameMode"
                                               value="multiPlayer"/>
                                        <label htmlFor="multi" className="css-label radGroup2">چهار نفره</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div className="columns six">
                                <label for="width">طول</label>
                                <input id="width" min="4" type="num" name="width"/>
                            </div>
                            <div className="columns six">
                                <label for="height">عرض</label>
                                <input id="height" min="4" type="num" name="height"/>
                            </div>
                        </div>
                        <div>
                            <div className="columns twelve">
                                <div>
                                    <div className="columns four">
                                        <input id="very-easy" className="css-checkbox" type="radio" name="difficult"
                                               value="1"/>
                                        <label htmlFor="very-easy" className="css-label radGroup2">سطح یک</label>
                                    </div>
                                    <div className="columns four">
                                        <input id="easy" className="css-checkbox" type="radio" name="difficult"
                                               value="2"/>
                                        <label htmlFor="easy" className="css-label radGroup2">سطح دو</label>
                                    </div>
                                    <div className="columns four">
                                        <input id="medium" className="css-checkbox" type="radio" name="difficult"
                                               value="3"/>
                                        <label htmlFor="medium" className="css-label radGroup2">سطح سه</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="columns four">
                                        <input id="hard" className="css-checkbox" type="radio" name="difficult"
                                               value="4"/>
                                        <label htmlFor="hard" className="css-label radGroup2">سطح چهار</label>
                                    </div>
                                    <div className="columns four">
                                        <input id="very-hard" className="css-checkbox" type="radio" name="difficult"
                                               value="5"/>
                                        <label htmlFor="very-hard" className="css-label radGroup2">سطح پنج</label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <input type="submit" className="btn green" value="شروع بازی"/>
                    </form>
                </div>
            );
        }
        if (status === 2) {
            let scorecards = [];
            pegs.forEach(function (peg) {
                scorecards.push(
                    <div key={peg.name} className="columns six scorecard">
                        <h5 style={{textAlign: 'center'}}> امتیاز {peg.name}<span
                            className="localStorage">{localStorage.getItem("name")}</span> : {peg.getPosition()}</h5>
                        <p style={{textAlign: 'center'}}>
                            تعداد تاس انداختن : {peg.getThrowCount()} <br/>
                            تعداد شش ها : {peg.getSixCount()} <br/>
                            مار گزیدگی : {peg.getSnakeEncounterCount()}<span
                            className="localStorage">{localStorage.getItem("Sanake")}</span>
                        </p>
                    </div>
                );
            });
            return (
                <div className="scoreboard">
                    <p style={{textAlign: 'center'}}>
                        {
                            pegs[pegs.map(function (p) {
                                document.getElementById('myTime').style.opacity = 0;
                                return p.getPosition()
                            }).indexOf(this.state.width * this.state.height)].name
                        }
                        برنده شد ! </p>
                    {scorecards}
                </div>
            );


        }
        let pegsType = [];
        pegs.forEach(function (peg) {
            pegsType.push(<div className="players columns six" key={pegs.indexOf(peg)}>نام : {peg.name} ، موقعیت : {peg.getPosition()}</div>);
        });
        return (
            <div>
                <div className="pegsType">
                    {pegsType}
                </div>
                <div className="gameboard">
                    <p className="notifications">{this.state.notification}</p>
                    <Grid snakes={snakes} width={this.state.width} height={this.state.height} pegs={this.state.pegs}/>
                    <Dice value={this.state.dice} throwDice={this.updateDice}/>
                </div>

            </div>
        );
    },
});
ReactDOM.render(
    <GameBoard />,
    document.getElementById('app')
);
