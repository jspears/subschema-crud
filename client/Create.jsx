"use strict";
var React = require('react');
var Subschema = require('subschema');
var api = require('../api');
function noop() {
};
var Create = React.createClass({
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
    componentWillReceiveProps(props){
        if (this.props.loading != props.loading) {
            this.setState({loading: props.loading});
        }
    },
    onSubmit()
    {
        var value = this.props.valueManager.getValue();
        if (this.props.onWillSubmit(value) !== false) {
            return this.save(value);
        }
    },
    save(value)
    {
        this.props.req.post(this.url(value), value).then(this.props.onDidSave, this.handleError);
    },
    render()
    {
        return <div>


        </div>
    }
});

module.exports = Create;