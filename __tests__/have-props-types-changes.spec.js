const havePropTypesChanged = require('../src/verify-modified-files/have-prop-types-changed')

// create compData mock, verify that we don't check changes that are not in type/required.
// check that the comparison is deep
// check addition of props, removal of props
