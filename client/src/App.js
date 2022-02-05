import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { AuthService } from './util/Auth';

import User from './pages/Users';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Message from './Message';
import Nav from './components/navbar/Navbar';

import {
    ADD_USER,
    //UPDATE_USER,
    DELETE_USER,
    ADD_USER_SUB,
    DELETE_USER_SUB
} from './util/mutations';

import { USER_QUERY } from '../src/util/queries';

import './App.css';

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const App = props => {
    const ADD_USER = ADD_USER;
    const user =
        (localStorage.getItem('token') &&
            JSON.parse(localStorage.getItem('token'))) ||
        {};

    const [receiverState, setReceiverState] = useState({
        receiverMail: '',
        receiverName: ''
    });

    const [userLeft, setUserLeft] = useState('');

    const [hidden, setHidden] = useState(false);

    const setSelectedMail = (mail, user) => {
        setReceiverState(receiverState => {
            return { ...receiverState, receiverMail: mail, receiverName: user };
        });
        setHidden(!hidden);
    };

    const setStyle = () => {
        setHidden(!hidden);
    };

    useEffect(() => {
        const subscribeToMore = props.data.subscribeToMore;
        subscribeToMore({
            document: ADD_USER_SUB,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data)
                    return prev;

                const user = subscriptionData.data.newUser;

                if (!prev.users.find(x => x.id === user.id)) {
                    return { ...prev, users: [...prev.users, user] };
                }
                return prev;
            }
        });
        subscribeToMore({
            document: DELETE_USER_SUB,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data)
                    return prev;

                const oldUser = subscriptionData.data.oldUser;

                if (prev.users.some(x => x.email === oldUser)) {

                    const newUsers = prev.users.filter(x => x.email !== oldUser);

                    prev.users = newUsers;

                    return prev;
                }
                setUserLeft(oldUser);

                return prev;
            }
        });
    }, [props.data]);

    const addUser = async (email, name) => {
        await props.addUser({
            variables: {
                email,
                name
            },
            update: (store, { data: { addUser } }) => {
                const data = store.readQuery({ query: USER_QUERY });

                if (!data.users.find(x => x.id === addUser.id)) {
                    data.users.push(addUser);
                }
                store.writeQuery({ query: USER_QUERY, data });
            }
        });
    };

    const deleteUser = async email => {
        localStorage.removeItem('token');
        await props.deleteUser({
            variables: { email },
            update: store => {
                const data = store.readQuery({ query: USER_QUERY });
                data.users = data.users.filter(x => x.email !== email);
                store.writeQuery({ query: USER_QUERY, data });
            }
        });
    };

    const { receiverMail, receiverName } = receiverState;

    const {
        data: { users, error, loading }
    } = props;

    if (loading || error) return null;
    if (authLink.getItem('token')) {
        return (
            <div className="chat-page">

                {/* <Switch> */}
                <User
                    style={{ display: hidden ? 'none' : 'block' }}
                    users={users}
                    email={user.email}
                    name={user.name}
                    selectedMail={setSelectedMail}
                    deleteUser={deleteUser}
                />
                <Message
                    style={{ display: hidden ? 'block' : 'none' }}
                    email={user.email}
                    receiverMail={receiverMail}
                    receiverName={receiverName}
                    userLeft={userLeft}
                    name={user.name}
                    setStyle={setStyle}
                />
                {/* </Switch> */}
            </div >
        );
    }
    //SignUp page
    return <SignUp users={users} addUser={addUser} />;
};

export default compose(
    graphql(USER_QUERY),
    graphql(ADD_USER, { name: 'createUser' }),
    graphql(DELETE_USER, { name: 'deleteUser' })
)(App);
