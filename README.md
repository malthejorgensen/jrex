jrex
====
A command line search-and-replace tool written in Javascript with node.js
It was built to replace `sed` in the same way `ack` replaces `grep`.

Installation
------------
`jrex` is not the npm repository yet, but hopefully will be soon.

<!--    > npm install jrex -->

Usage
-----

    jrex [options] <regex> <files...>

To get `jrex` to read from STDIN use `-` as a file

    > echo 'cats and hats' | jrex 'a' -
    1: a
    1: a
    1: a

This shows the three occurences of 'a' in the first line of the input.

To replace all a's with b's in the input:

    > echo 'cats and hats' | jrex 'a' -r 'b' -
    cbts bnd hbts


Why _not_ sed?
--------------
### Bad defaults
`sed` only replaces first occurence by default, but 99% of use cases you
 want to replace all occurences.

    > echo 'cats and hats' | sed 's/a/b/'
    cbts and hats
    > echo 'cats and hats' | sed 's/a/b/g'
    cbts and hbts

### Unix style regular expressions
By now we take _regular expression_ to mean some flavor of
[PCRE] (Perl Compitable Regular Expressions). `sed` uses "BRE's" by default,
where, for example, parenthesis in capture groups have to be escaped, or you
have to use the `-E` flag to use Extended Regular Expressions:

    > echo 'cats and hats' | sed 's/a(.)/\1\1/g'
    sed: 1: "s/a(.)/\1\1/g": \1 not defined in the RE

    > echo 'cats and hats' | sed 's/a\(.\)/\1\1/g'
    ctts nnd htts

    > echo 'cats and hats' | sed -E 's/a(.)/\1\1/g'
    ctts nnd htts

### No multiline replacements
While `sed` is [turing complete][sed-turing-complete], something as simple as
replacing all newlines in a file is quite difficult:

    > echo 'cats
    and
    hats' | sed 's/\n/ /g'
    cats
    and
    hats


[PCRE]: http://www.pcre.org/
[sed-turing-complete]: http://www.catonmat.net/blog/proof-that-sed-is-turing-complete/
