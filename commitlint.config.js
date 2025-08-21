module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [0, 'always'],
    'subject-case': [2, 'always', /^[a-z][\s\S]*$/],
  },
};
