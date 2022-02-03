import React, { useState, useEffect, useRef } from 'react';
import { graphql, compose } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { USER_QUERY, MESSAGES_QUERY } from '../util/queries';
import {
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    ADD_USER_SUB,
    DELETE_USER_SUB,
    CREATE_MESSAGES,
    MESSAGES_SUB

} from '../util/mutations';

const Message = props => {
    const chatBox = useRef(null);

    const [message, setMessage] = useState('');

    const [userTyping, setUser] = useState('');

    const [timer, setTimer] = useState(null);

    const handleShow = () => {
        props.setStyle();
    }
}   