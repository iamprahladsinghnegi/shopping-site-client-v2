import React from 'react'
// import { useAllUserQuery } from 'src/generated/graphql';
interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({ }) => {
    // const { data } = useAllUserQuery({ fetchPolicy: "network-only" });

    // if (!data) {
    //     return <div>loading....</div>
    // }

    return (<div>
        <div>
            users: here
        </div>
        {/* <ul> */}
        {/* {data.getAllUsers.map(user => {
                return (
                    <li key={user.id}>
                        {user.email} : {user.id}
                    </li>
                )
            })} */}
        {/* </ul> */}
    </div>)
}