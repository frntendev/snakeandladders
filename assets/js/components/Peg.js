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