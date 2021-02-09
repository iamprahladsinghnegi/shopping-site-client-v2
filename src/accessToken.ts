import SecureLS from "secure-ls";
var ls = new SecureLS({
    encodingType: "aes"
});

export const setAccessToken = (token: string) => {
    console.log('setting access token', token)
    ls.set('accessToken', token)
}
export const getAccessToken = () => {
    return ls.get('accessToken')
}