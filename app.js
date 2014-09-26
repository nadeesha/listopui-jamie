window.onkeydown = function(e) {
    if (e.ctrlKey && e.keyCode === 13) {
        e.preventDefault();
        debugger;
        var currRow = editor.getSelectionRange().start.row;
        var currLine = editor.session.doc.getLine(currRow);

        if (!currLine) {
            console.log('can not get current line');
            return;
        } else {
        	currLine = currLine.trim();
        }

        var op = currLine.split('#')[1];

        if (!op) {
            console.log('current line has no op');
            return;
        } else {
            op = op.trim();
        }

        replaceLine(currRow, currLine + ':processing');

        $.post('http://api.listop.io/' + op, function(data) {
            debugger;
            replaceLine(currRow, currLine + ':done');
        })
            .error(function(data) {
                debugger;
                replaceLine(currRow, currLine + ':failed');
            });
    }
}

var replaceLine = function(row, newText) {
    var Range = require("ace/range").Range;
    editor.session.replace(new Range(row, 0, row, Number.MAX_VALUE), newText);
}
