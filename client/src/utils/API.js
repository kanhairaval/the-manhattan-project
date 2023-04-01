export const getMe = (token) => {
    return fetch('/api/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('something went wrong!');
                }
                return res.json();
            }
            );
};

export const createUser = (userFormData) => {
    return fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userFormData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('something went wrong!');
            }
            return res.json();
        }
        );
}

export const loginUser = (userFormData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(userFormData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('something went wrong!');
            }
            return res.json();
        }
        );
}

export const logoutUser = (token) => {
    return fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('something went wrong!');
                }
                return res.json();
            }
            );
}

export const updateUser = (userFormData, token) => {
    return fetch('/api/users/user', {
        method: 'PUT',
        body: JSON.stringify(userFormData),
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('something went wrong!');
                }
                return res.json();
            }
            );
}

export const deleteUser = (token) => {
    return fetch('/api/users/user', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('something went wrong!');
                }
                return res.json();
            }
            );
}

export const setScore = (score, token) => {
    return fetch('/api/users/score', {
        method: 'PUT',
        body: JSON.stringify(score),
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('something went wrong!');
                }
                return res.json();
            }
            );
}
