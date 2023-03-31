export const personalScore = () => {
    const personalScore = localStorage.getItem('personalScore');
    if (personalScore) {
        return personalScore;
    } else {
        return 0;
    }
};

export const setPersonalScore = (score) => {
    localStorage.setItem('personalScore', score);
};

export const removePersonalScore = () => {
    const personalScore = localStorage.getItem('personalScore');
    if (!personalScore) {
        return;
    } else {
        localStorage.removeItem('personalScore');
    }   
};
        
