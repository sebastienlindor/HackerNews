import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    componentDidMount() {
        if (this.input) {
            this.input.focus();
            this.input.select();
        }
    }

    render() {
        const {
            value,
            onChange,
            onSubmit,
            children
        } = this.props;

        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    ref={el => this.input = el}
                />
                <button type="submit">
                    {children}
                </button>
            </form>
        )
    };
}

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default Search;