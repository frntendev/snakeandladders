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