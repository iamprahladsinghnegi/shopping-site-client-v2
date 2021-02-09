import React from 'react'
import { Link } from 'react-router-dom';
import { setAccessToken } from 'src/accessToken';
import { useLogoutUserMutation, useUserDetailsQuery } from 'src/generated/graphql';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
    const { data, loading } = useUserDetailsQuery() //for testing { fetchPolicy: 'network-only' } otherwise use apollo cache to store user data and user the the in entire app
    const [logoutUser, { client }] = useLogoutUserMutation()
    let body: any = null
    if (loading) {
        body = null
    } else if (data && data.getUserDetails) {
        console.log(data.getUserDetails)
        body = <div>Current user email : {data.getUserDetails.email}</div>
    } else {
        body = <div>Plz LogIn</div>
    }
    return (
        <header>
            <div><Link to="/">home</Link></div>
            <div><Link to="/register">register</Link></div>
            <div><Link to="/login">login</Link></div>
            <div><Link to="/bye">bye</Link></div>
            {body}
            {!loading && data?.getUserDetails ?
                <button onClick={async () => {
                    return logoutUser().then(res => {
                        setAccessToken('');
                        client.resetStore();
                    })
                }} >Logout</button>
                :
                null}
        </header>
    );
} 