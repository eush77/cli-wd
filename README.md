# cli-cwd [![Dependency Status][david-badge]][david]

[![npm](https://nodei.co/npm/cli-cwd.png)](https://nodei.co/npm/cli-cwd/)

[david]: https://david-dm.org/eush77/cli-cwd
[david-badge]: https://david-dm.org/eush77/cli-cwd.png

Runs specified command with modified CWD, redirecting all stdio in the correct way (i.e. you can pipe or redirect stdin/stdout/stderr).

The package installs `cwd` command with the following signature:

```
cwd <directory> -- <command> [arg]...
```

## Examples

```bash
$ cwd /usr/bin -- pwd
/usr/bin

$ cwd /usr/bin -- ls |ack '^zip'
zip
zipcloak
zipgrep
zipinfo
zipnote
zipsplit
```

More realistic example — universally operate on directories no-matter-what-flag-tool-authors-have-chosen-to-use.

```bash
$ cwd ./dir -- tar cvaf ../dir.tbz2 .
$ cwd ./dir -- zip -r ../dir .
$ cwd ./dir -- 7z a ../dir . -tzip
```

In all of these cases files are saved with file names relative to `./dir`.

## CLI

```
Usage:  cwd <directory> -- <command> [arg]...
```

## Install

```shell
npm install -g cli-cwd
```

## License

MIT
