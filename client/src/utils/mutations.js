import {gql} from '@apollo/client';


export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const SAVE_SCORE = gql`
    mutation saveScore($score: Int!, $name: String!) {
        saveScore(score: $score, name: $name) {
            _id
            score
            name
            createdAt
        }
    }
`;


