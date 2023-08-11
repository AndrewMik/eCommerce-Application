const validatePasswordRegExp = /(^(?![\s]))(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W)(.{7,})(.*!?(\S+)$)/;

export default validatePasswordRegExp;
