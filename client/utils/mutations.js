import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
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

export const REMOVE_SCORE = gql`
    mutation removeScore($scoreId: ID!) {
        removeScore(scoreId: $scoreId) {
            _id
        }
    }
`;

