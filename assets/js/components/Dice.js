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