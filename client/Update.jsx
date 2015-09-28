"use strict";
var React = require('react');
var Subschema = require('subschema');
var req = require('../request');
function noop() {
};
var Update = React.createClass({
    propTypes: {
        schema: React.Types.obj,
        url: React.Types.str,
        title: React.Types.str,
    },
    getDefaultProps(){
        return {
            onWillSubmit: noop,
            onDidSubmit: noop,
            req: req
        }
    },
    getInitialState(){
        return {
            loading: this.props.loading
        }
    },
    url(value){

    },
    handleSubmit(){

    },
    handleError(error){

    },
    componentWillReceiveProps(props){
        if (this.props.loading != props.loading) {
            this.setState({loading: props.loading});
        }
    },
    componentDidMount(){
        var {params, value} = this.props;
        if (value && params && (!value || !value._id || !(value._id === params.id))) {
            this.load().then(this.ready, this.handleError);
        }
    },
    onSubmit()
    {
        var value = this.props.valueManager.getValue();
        if (this.props.onWillSubmit(value) !== false) {
            return this.update(value);
        }
    },
    update(value)
    {
        this.props.req.post(this.url(value), value).then(this.handleSubmit, this.handleError);
    },
    render()
    {
        return <div>


        </div>
    }
});

module.exports = Update;