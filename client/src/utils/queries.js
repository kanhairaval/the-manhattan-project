import {gql} from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            name
            email
        }
    }
`;

export const GET_USERS = gql`
    query users {
        users {
            _id
            name
            email
        }
    }
`;

