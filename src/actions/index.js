export const signIn = ({email, password}) => {
    return {
        type: 'SIGN_IN',
        payload: {
            email: email,
            password: password
        }
    }
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
};
