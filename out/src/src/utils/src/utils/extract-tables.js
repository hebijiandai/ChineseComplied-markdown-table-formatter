"use strict";
var TABLE_EXP = /((?:(?:[^\n]*?\|[^\n]*)\ *)?(?:\r?\n|^))((?:\|\ *(?::?-+:?|::)\ *|\|?(?:\ *(?::?-+:?|::)\ *\|)+)(?:\ *(?::?-+:?|::)\ *)?\ *\r?\n)((?:(?:[^\n]*?\|[^\n]*)\ *(?:\r?\n|$))+)/g;
function extarctTables(text) {
    return text.match(TABLE_EXP);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extarctTables;
//# sourceMappingURL=extract-tables.js.map