const validateRegistrationData = (data) => {
    const { email, password, firstName, lastName } = data;
    if (!email || !password || !firstName || !lastName) {
        throw new Error("Please fill out the form correctly!");
    }
};

const validateGoogleRegistrationData = (data) => {
    const { name, email } = data;
    if (!name || !email) {
        throw new Error("Please fill out the form correctly!");
    }
};

const validateLoginData = (data) => {
    const { email, password } = data;
    if (!email || (!password && !data.name)) {
        throw new Error("Please fill out the form correctly!");
    }
};

module.exports = {
    validateRegistrationData,
    validateGoogleRegistrationData,
    validateLoginData,
};
