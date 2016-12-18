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