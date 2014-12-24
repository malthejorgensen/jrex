#!/usr/bin/env node

var DEBUG = false;
var MODE = 'search';

if (DEBUG) {
  process.argv.forEach(function(val, i, arr) {
    console.log(val);
  });
}

// Ignore the two first args: "node" and "stdin_regex.js"
if (process.argv[2] === undefined) {
  process.stderr.write('You must supply a regex as the first command line argument');
  process.exit(1);
}
if (process.argv[3] !== undefined) {
  MODE = 'replace';
  var str_replace = process.argv[3].replace(/\\n/g, '\n');
  // process.stderr.write('You must supply a replacement str as the second command line argument');
  // process.exit(1);
}
// When replacement string like "line1\nline2" is given as an cmdline argument
// it is passed as "line1\\nline2". So we convert it to what the user expects.

try {
  // RegExp options
  // - 'g' global (default: off)
  // - 'm' multiline (default: off)
  // - 'i' ignore case (default: off)
  var re = new RegExp(process.argv[2], 'g'); // our regex is global by default
} catch (e)  {
  if (e instanceof SyntaxError) {
    process.stderr.write('Supplied regex was incorrect: ' + e.message);
  } else  {
    process.stderr.write('Unexpected error happened' + e.message);
  }
}


process.stdin.resume();
process.stdin.setEncoding('utf8');

var str_in = "";

process.stdin.on('data', function(chunk) {
  str_in += chunk;
});

process.stdin.on('end', function() {
  if (MODE === 'replace') {
    var str_out = str_in.replace(re, str_replace);
    process.stdout.write(str_out);
  } else { // if MODE === 'search'
    var char_line = new Array(str_in.length);
    var line_no = 1;
    for (var i = 0; i < str_in.length; i++) {
      char_line[i] = line_no;
      if (str_in[i] === '\n') { line_no += 1; }
    }

    var exit_status = 1;

    while ( (result = re.exec(str_in)) ) {
      process.stdout.write(char_line[result.index].toString() + ": " + result[0] + "\n");
      // indices.push(result.index);
      exit_status = 0;
    }

    // End process
    // - return 0 if one or more matches were found
    // - return 1 if no matches were found
    process.exit(exit_status);
  }
});
