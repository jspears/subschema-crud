var React = require('react');
var isString = require('lodash/lang/isString');

var Action = React.createClass({
    getDefaultProps(){
        return {}
    },
    switchType(props){
        var {action, loader} = props;
        var resp = isString(action) ? loader.loadType(action) : action;
        if (resp && typeof resp.then === 'function') {
            return resp.then((ActionType)=> {
                this.ActionType = ActionType;
                return props.api[action](props.params).then(this.handleLoad, this.handleError);
            });
        } else {
            this.ActionType = action;
            return props.api[action](props.params).then(this.handleLoad, this.handleError);
        }
    },
    componentWillMount(){
        this.switchType(this.props);
    },
    componentWillReceiveProps(props){
        this.switchType(props);
    },
    handleLoad(value){
        this.setState({busy: true, value: value, error: false});
    },
    handleError(error){
        this.setState({busy: false, error})
    },
    render(){
        var ActionType = this.ActionType;
        return this.state.busy ? <div className={'loading '+this.state.modelName}/> : this.state.error ?
            <div className='error'>{this.state.error}</div> : <ActionType {...this.props}/>
    }
});

Action.propTypes = {
    url: React.Types.str,
    model: React.Types.of(React.Types.str, React.Types.obj),
    action: React.Types.str.required,
    loader: React.Types.shape({
        loadAction: React.Types.func
    }).required

}
Action.urlPattern = '/rest/{model}'
module.exports = Action;