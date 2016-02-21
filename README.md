[![npm](https://nodei.co/npm/cli-wd.png)](https://nodei.co/npm/cli-wd/)

# cli-wd [![Dependency Status][david-badge]][david]

[david]: https://david-dm.org/eush77/cli-wd
[david-badge]: https://david-dm.org/eush77/cli-wd.png

Run program in a modified working directory.

## Example

```
$ wd /usr/bin pwd
/usr/bin
```

Put archive file in a custom directory across archivers:

```
$ wd ./dir tar cvaf ../dir.tbz2 .
$ wd ./dir zip -r ../dir .
$ wd ./dir 7z a ../dir . -tzip
```

Start a subshell:

```
$ wd /
$ echo $SHLVL $PWD
2 /
```

## CLI

#### `wd [-s | --shell] <directory> [<command>] [arg]...`

Run `<command>` (which defaults to `$SHELL`) with supplied arguments in a given working directory. Fall back to shell (just in case `<command>` is a shell function or alias).

`--shell` forces command to be executed in shell.

## API

This is only a thin wrapper over [kexec](http://https://github.com/jprichardson/node-kexec) falling back to [child_process.spawnSync](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options), but anyway:

#### `spawnFrom(wd, cmd, argv)`

Synchronously spawn process defined by `cmd` and `argv` in the working directory `wd`.

<dl>
<dt>wd</dt>
<dd>Working directory to spawn process in.</dd>

<dt>cmd</dt>
<dd>Command to run.</dd>

<dt>argv</dt>
<dd>Array of arguments.</dd>
</dl>

## Install

```shell
npm install -g cli-wd
```

## License

MIT
