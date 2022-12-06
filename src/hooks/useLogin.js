import { useQuery, gql } from "@apollo/client"; 

export const useLogin = (username, password) => {
    const VERIFY_USERINFO = gql`
        query VerifyUserInfo($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                username
                photos
                id
                likedPhotos
            }
        }`
    
    const {error, data, loading} = useQuery(VERIFY_USERINFO, {
        variables: {
            username,
            password
        }
    })
    return {
        error,
        data,
        loading,
    }
}