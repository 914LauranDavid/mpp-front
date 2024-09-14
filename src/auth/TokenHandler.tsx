

export const getRequestConfigWithToken = (token: string) => {
    return {
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };
}