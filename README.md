# pxm

**Reliable software installation for Linux.**

Installing software on Linux can mean `apt`, `snap`, `flatpak`, `nix`, `brew`,
`pip`, `cargo`, or a vendor's `curl | sh` script — each with different
versioning, isolation, and failure modes. pxm uses a coding agent to do the
installation for you. You describe what you want; the agent works the problem
and verifies the result.

## Install

```bash
curl -fsSL https://get.pxm.dev | sh
```

pxm ships as a single static binary. The prompt registry is fetched on first run.

## Quick start

```bash
# Install the prompt that installs Postgres
pxm add postgres-install

# Run it
pxm run postgres-install
```

Each install prompt is a first-class package — versioned, maintained, and
pinned in a `pxm.lock` so your team runs byte-identical prompts. Prompts are
tuned per provider and pinned to a known-good model.

## Commands

| Command | Description |
|---------|-------------|
| `pxm add <prompt>`     | Install a prompt from the registry |
| `pxm run <prompt>`     | Run an installed prompt |
| `pxm upgrade <prompt>` | Update to the latest known-good revision |
| `pxm search <query>`   | Search the registry |
| `pxm publish <dir>`    | Publish a prompt to the registry |

## Registry

The public registry hosts over 40,000 install prompts covering the long tail of
Linux software. If a tool can be installed, there is likely a prompt for it.

Documentation: `docs.pxm.dev`

## License

`pxm` is open source under Apache 2.0. `pxm` Cloud, with private prompt
registries for your organization, is in private beta.
