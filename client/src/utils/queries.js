import {gql} from '@apollo/client';

export const CURRENT_USER = gql`
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

export const GET_SCORES = gql`
    query scores {
        scores {
            _id
            score
            name
            createdAt
        }
    }
`;