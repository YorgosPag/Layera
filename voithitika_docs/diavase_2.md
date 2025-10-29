PS C:\layera\apps\layera-geoalert> git add . ; if ($?) { git commit -m " Auto-commit #$(git rev-list --count HEAD)" } ; if ($?) { git      
>>   push }
SyntaxError: Invalid regular expression: /^(?!.*--la-)(?!.*calc()(?!.*var().*$/: Unterminated group
    at C:\layera\apps\layera-id\src\index.css:2:3
    at new RegExp (<anonymous>)
    at testAgainstStringOrRegExp (file:///C:/layera/node_modules/.pnpm/stylelint@16.25.0_typescript@5.9.3/node_modules/stylelint/lib/utils/matchesStringOrRegExp.mjs:84:6)
    at testAgainstStringOrRegExpOrArray (file:///C:/layera/node_modules/.pnpm/stylelint@16.25.0_typescript@5.9.3/node_modules/stylelint/lib/utils/matchesStringOrRegExp.mjs:38:10)
    at matchesStringOrRegExp (file:///C:/layera/node_modules/.pnpm/stylelint@16.25.0_typescript@5.9.3/node_modules/stylelint/lib/utils/matchesStringOrRegExp.mjs:17:10)
    at file:///C:/layera/node_modules/.pnpm/stylelint@16.25.0_typescript@5.9.3/node_modules/stylelint/lib/rules/declaration-property-value-disallowed-list/index.mjs:39:50
    at Array.filter (<anonymous>)
    at file:///C:/layera/node_modules/.pnpm/stylelint@16.25.0_typescript@5.9.3/node_modules/stylelint/lib/rules/declaration-property-value-disallowed-list/index.mjs:39:34
    at C:\layera\node_modules\.pnpm\postcss@8.5.6\node_modules\postcss\lib\container.js:363:18
    at C:\layera\node_modules\.pnpm\postcss@8.5.6\node_modules\postcss\lib\container.js:315:18
    at Rule.each (C:\layera\node_modules\.pnpm\postcss@8.5.6\node_modules\postcss\lib\container.js:63:16)   
husky - pre-commit script failed (code 1)
PS C:\layera\apps\layera-geoalert> 