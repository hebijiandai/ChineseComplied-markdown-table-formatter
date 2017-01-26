"use strict";
function tableFormat(context) {
    return '' + formatTable(context);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tableFormat;
var formatTable, slice = [].slice;
formatTable = function (text) {
    var addTailPipes, back, cell, cells, columns, content, data, ends, first, formatline, formatrow, formatted, front, headerline, i, joinCells, just, justify, last, line, lines, padding, ref, splitCells, stripTailPipes, widths;
    padding = function (len, str) {
        if (str == null) {
            str = ' ';
        }
        return str.repeat(len);
    };
    stripTailPipes = function (str) {
        return str.trim().replace(/(^\||\|$)/g, "");
    };
    splitCells = function (str) {
        return str.split('|');
    };
    addTailPipes = (function (_this) {
        return function (str) {
            if (_this.keepFirstAndLastPipes) {
                return "|" + str + "|";
            }
            else {
                return str;
            }
        };
    })(this);
    joinCells = function (arr) {
        return arr.join('|');
    };
    formatline = text[2].trim();
    headerline = text[1].trim();
    ref = headerline.length === 0 ? [0, text[3]] : [1, text[1] + text[3]], formatrow = ref[0], data = ref[1];
    lines = data.trim().split('\n');
    justify = (function () {
        var j, len1, ref1, ref2, results;
        ref1 = splitCells(stripTailPipes(formatline));
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
            cell = ref1[j];
            ref2 = cell.trim(), first = ref2[0], last = ref2[ref2.length - 1];
            switch (ends = (first != null ? first : ':') + (last != null ? last : '-')) {
                case '::':
                case '-:':
                    results.push(ends);
                    break;
                case '--':
                    if (this.defaultTableJustification === 'Left') {
                        results.push(':-');
                    }
                    else if (this.defaultTableJustification === 'Center') {
                        results.push('::');
                    }
                    else if (this.defaultTableJustification === 'Right') {
                        results.push('-:');
                    }
                    else {
                        results.push(':-');
                    }
                    break;
                default:
                    results.push(':-');
            }
        }
        return results;
    }).call(this);
    columns = justify.length;
    content = (function () {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = lines.length; j < len1; j++) {
            line = lines[j];
            cells = splitCells(stripTailPipes(line));
            cells[columns - 1] = joinCells(cells.slice(columns - 1));
            results.push((function () {
                var k, len2, ref1, results1;
                results1 = [];
                for (k = 0, len2 = cells.length; k < len2; k++) {
                    cell = cells[k];
                    results1.push(padding(this.spacePadding) + ((ref1 = cell != null ? typeof cell.trim === "function" ? cell.trim() : void 0 : void 0) != null ? ref1 : '') + padding(this.spacePadding));
                }
                return results1;
            }).call(this));
        }
        return results;
    }).call(this);
    widths = (function () {
        var j, ref1, results;
        results = [];
        for (i = j = 0, ref1 = columns - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
            results.push(Math.max.apply(Math, [2].concat(slice.call((function () {
                var k, len1, results1;
                results1 = [];
                for (k = 0, len1 = content.length; k < len1; k++) {
                    cells = content[k];
                    results1.push(swidth(cells[i]));
                }
                return results1;
            })()))));
        }
        return results;
    })();
    just = function (string, col) {
        var back, front, length;
        length = widths[col] - swidth(string);
        switch (justify[col]) {
            case '::':
                front = padding[0], back = padding[1];
                return padding(length / 2) + string + padding((length + 1) / 2);
            case '-:':
                return padding(length) + string;
            case ':-':
                return string + padding(length);
            default:
                return string;
        }
    };
    formatted = (function () {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = content.length; j < len1; j++) {
            cells = content[j];
            results.push(addTailPipes(joinCells((function () {
                var k, ref1, results1;
                results1 = [];
                for (i = k = 0, ref1 = columns - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
                    results1.push(just(cells[i], i));
                }
                return results1;
            })())));
        }
        return results;
    })();
    formatline = addTailPipes(joinCells((function () {
        var j, ref1, ref2, results;
        results = [];
        for (i = j = 0, ref1 = columns - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
            ref2 = justify[i], front = ref2[0], back = ref2[1];
            results.push(front + padding(widths[i] - 2, '-') + back);
        }
        return results;
    })()));
    formatted.splice(formatrow, 0, formatline);
    return (headerline.length === 0 && text[1] !== '' ? '\n' : '') + formatted.join('\n') + '\n';
};
//# sourceMappingURL=table-format.js.map