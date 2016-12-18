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
