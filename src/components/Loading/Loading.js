import React from 'react';
import PropTypes from 'prop-types';

const Loading = () =>
    <div>Loading...</div>;

Loading.protoTypes = {
    children: PropTypes.node.isRequired
};

export default Loading;