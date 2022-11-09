import PropTypes from 'prop-types';

import { ErrorMessage } from './Error.styled';

const Error = ({ message }) => {
    return (
        <ErrorMessage>{message}</ErrorMessage>
    )
}

export default Error

Error.propTypes = {
    message: PropTypes.string
}