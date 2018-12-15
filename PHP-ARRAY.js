function eachWithIdx(iterable, f) {
    var i = iterable.iterator();
    var idx = 0;
    while (i.hasNext()) f(i.next(), idx++);
}

function mapEach(iterable, f) {
    var vs = [];
    eachWithIdx(iterable, function (i) {
        vs.push(f(i));
    });
    return vs;
}

function escape(str) {
    if (!isNaN(str)) {
        return str;
    } else {
        return "'" + str + "'";
    }
}

var NEWLINE = "\n";

function output() {
    for (var i = 0; i < arguments.length; i++) {
        OUT.append(arguments[i]);
    }
}

function outputRow(items) {
    output("[");
    for (var i = 0; i < items.length; i++)
        output(items[i]);
    output("]", ',', NEWLINE);
}

output("[", NEWLINE);
if (TRANSPOSED) {
    var values = [];
    eachWithIdx(ROWS, function (row) {
        eachWithIdx(COLUMNS, function (col, i) {
            var str = '"' + col.name() + '" ' + "=>" + FORMATTER.format(row, col) + ", ";
            values[i].push(str);
        });
    });
    eachWithIdx(COLUMNS, function (_, i) {
        outputRow(values[i]);
    });
} else {

    eachWithIdx(ROWS, function (row) {
        outputRow(mapEach(COLUMNS, function (col) {
            var str = '"' + col.name() + '" ' + "=>" + escape(FORMATTER.format(row, col)) + ", ";
            return str;
        }))
    });
}

output("]", NEWLINE);