[![npm](https://nodei.co/npm/cli-cwd.png)](https://nodei.co/npm/cli-cwd/)

# cli-cwd [![Dependency Status][david-badge]][david]

[david]: https://david-dm.org/eush77/cli-cwd
[david-badge]: https://david-dm.org/eush77/cli-cwd.png

Run program in a modified working directory.

## Example

```
$ cwd /usr/bin pwd
/usr/bin
```

Put archive file in a custom directory across archivers:

```
$ cwd ./dir tar cvaf ../dir.tbz2 .
$ cwd ./dir zip -r ../dir .
$ cwd ./dir 7z a ../dir . -tzip
```

Start a subshell:

```
$ cwd /
$ echo $SHLVL $PWD
2 /
```

## CLI

```
Usage:  cwd <directory> [<command>] [arg]...
```

`<command>` defaults to `$SHELL` if omitted.

## Install

```shell
npm install -g cli-cwd
```

## License

MIT
