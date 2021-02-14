import React, { useEffect, useState } from 'react'
import { setAccessToken } from 'src/accessToken';
import { Routes } from 'src/Routes';

interface AppProps {
}

export const App: React.FC<AppProps> = () => {
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetch('http://localhost:5555/refresh_token', { credentials: 'include', method: "POST" }).then(res => {
    //         return res.json()
    //     }).then(({ accessToken }) => {
    //         setAccessToken(accessToken);
    //         setLoading(false)
    //     }).catch(err => {
    //         console.log('unbale to load app reason', err)
    //     })
    // }, [])

    // if (loading) {
    //     return <div>App is Loading please wait....</div>
    // }
    return (<Routes />);
}