
/*
 * Check that version specified in `package.json` and `bin/jrex` are the same.
 */

var version_bin = require('../bin/jrex').version;
var version_package = require('../package.json').version;

if (version_bin === version_package) {
  process.exit(0);
} else {
  console.error('Version mismatch: bin/jrex = "%s" package.json = "%s"', version_bin, version_package)
  process.exit(1);
}

