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
import { Prev } from 'react-bootstrap/esm/PageItem';

const Message = props => {
    const chatBox = useRef(null);
    const [message, setMessage] = useState('');
    // const [userTyping, setUser] = useState('');
    const [timer, setTimer] = useState(null);

    const handleShow = () => {
        props.setStyle();
    };

    useEffect(() => {
        props.message.subscribeToMore({
            document: MESSAGES_SUB,
            variables: {
                messReceiver: props.email
            },
            updateQuery: (prev, { subData }) => {
                if (!subData.data)
                    return prev;
                const msg = subData.data.newMessage;
                if (prev.message.find(x => x.id === msg.id)) {
                    return Prev;
                }
                return { ...prev, messages: [...prev.messages, msg] };
            }
        });
        props.message.subscribeToMore({
            document: UserTypingSubscription,
            variables: {
                receiverMail: props.email
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data)
                    return prev;
                const user = subscriptionData.data.userTyping;
                setUser(user);
            }
        });
        if (chatBox.current) {
            scrollToBottom;
        }
    });

    //scroll to bottom of chatbox with element.scrollIntoView() method
    const scrollToBottom = () => {
        chatBox.current.scrollIntoView();
    };

    const handleChange = async e => {
        setMessage(e.target.value);
        const { email, messReceiver } = props;
        await props.userTyping({
            variables: {
                email,
                messReceiver
            }
        });

        const changeMail = async () => {
            await props.userTyping({
                variables: {
                    email,
                    messReceiver
                }
            });
        };
        clearTimeout(timer);
        setTimer(setTimeout(changeMail, 2000));
    };

    const handleSubmit = async (e, message, email) => {
        setMessage(' ');
        e.preventDefault();
        const { messReceiver } = props;
        if (!message.length)
            return null;
        await props.createMessage({
            variables: {
                messReceiver: messReceiver,
                messSender: messSender,
                messText: message,
                messTime: Date.now()
            },
            update: (store, { data: { createMessage } }) => {
                const data = store.readQuery({ query: MessageQuery });
                data.messages.push(createMessage);
                store.writeQuery({ query: MessageQuery, data });
            }
        });

        await props.userTyping({
            variables: {
                email: 'email',
                messReceiver
            }
        });
    }
    const {
        messText: { error, loading, messages },
        email,
        messReceiver,
        receiverName,
        userLeft
    } = props;

    //if there's an error or it's loading, nothing is shown
    if (error || loading)
        return null;

    return (
        <div className="personal-chat" style={props.style}>
            <div className="chats-header">
                <div className="back-button" onClick={handleShow}>
                    <div className="bar1" />
                    <div className="bar2" />
                    <div className="bar3" />
                </div>
                <div className="user-typing">
                    {userTyping && userTyping === messReceiver
                        ? `${receiverName} is typing`
                        : receiverName}
                </div>
            </div>
            <div className="all-messages">
                {messages.map(item =>
                    (item.messSender === email && item.messReceiver === messReceiver) ||
                        (item.messSender === messReceiver && item.messReceiver === email) ? (
                        <div
                            key={item.id}
                            className={item.users.map(a =>
                                a.email === messReceiver ? 'receiver' : 'sender'
                            )}
                        >
                            <div className="sender-name">{item.users.map(x => x.name)}</div>
                            {item.message}{' '}
                            <span className="time"> {moment(item.timestamp).fromNow()}</span>
                        </div>
                    ) : (
                        ''
                    )
                )}
                {userLeft && userLeft === messReceiver ? (
                    <div>{receiverName} has left the chat. </div>
                ) : null}
            </div>
            {receiverMail && receiverName && !userLeft ? (
                <form
                    onSubmit={e => handleSubmit(e, message, email)}
                    ref={chatBox}
                    className="chat-box"
                >
                    <TextField
                        style={{ margin: 10 }}
                        placeholder={'Say something to ' + receiverName}
                        fullWidth
                        name="message"
                        value={message}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                </form>
            ) : (
                <div className="select-message">
                    Select a logged in user from the left panel
                </div>
            )}
        </div>
    );
};
