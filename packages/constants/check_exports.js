const constants = require('./dist/index.js');

console.log('🔍 Checking exports...');
console.log('AUTOCOMPLETE_VALUES exists:', typeof constants.AUTOCOMPLETE_VALUES !== 'undefined');
console.log('FORM_SIZES exists:', typeof constants.FORM_SIZES !== 'undefined');
console.log('INPUT_VARIANTS exists:', typeof constants.INPUT_VARIANTS !== 'undefined');
console.log('CONFIG exists:', typeof constants.CONFIG !== 'undefined');
console.log('Total exports count:', Object.keys(constants).length);
console.log('');
console.log('📋 All exported names:');
console.log(Object.keys(constants).slice(0, 20).join(', '), '...');