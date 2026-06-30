# Introducing `pxm` — Reliable Software Installation for Linux

**`pxm` 1.0 is now generally available.**

Installing software on Linux has become genuinely difficult. A single tool might be available through `apt`, `snap`, `flatpak`, `nix`, `brew`, `pip`, `cargo`, or a vendor's `curl | sh` script, each with different versioning, isolation, and failure modes. `pxm` solves this by using a coding agent to do the installation for you. You describe what you want; the agent works the problem and verifies the result.

But an agent is only as good as its prompt. A prompt that installs Postgres correctly on Debian is not the same prompt that installs it on Arch, or that handles a pinned dependency, or that knows to add the upstream repository. These prompts are real engineering artifacts: they are written, tested, versioned, and improved. And like any artifact, they need to be distributed.

## Prompts are packages

`pxm` treats each install prompt as a first-class package. A prompt has a name, a version, a maintainer, dependencies on other prompts, and a changelog. It lives in a registry. You install it before you can run it.

```bash
# Install the prompt that installs Postgres
pxm add postgres-install

# Run it
pxm run postgres-install
```

`postgres-install` is maintained by the community, pinned to a known-good revision, and tested against every major distribution. When someone discovers a better way to handle the PGDG repository edge case, they publish `postgres-install@2.4.1`, and you get the improvement with `pxm upgrade`.

## Dependency resolution

Prompts depend on other prompts. `postgres-install` depends on `apt-base`, `repo-management`, and `verify-binary`. `pxm` resolves the full prompt dependency tree, fetches each from the registry, and pins the resolved set in a `pxm.lock` so your teammates run byte-identical prompts.

```
Resolving prompt dependencies...
  postgres-install@2.4.1
    ├── apt-base@1.8.0
    ├── repo-management@3.1.2
    └── verify-binary@0.9.4
Locked 4 prompts.
```

## The registry

The public `pxm` registry hosts over 40,000 install prompts covering the long tail of Linux software. If a tool can be installed, there is likely a prompt for it. If there isn't, writing one is straightforward, and publishing it helps the next person.

```bash
pxm search "redis"
pxm publish ./my-redis-install
```

## Installation

```bash
curl -fsSL https://get.pxm.dev | sh
```

`pxm` ships as a single static binary. The prompt registry is fetched on first run.

## Availability

`pxm` 1.0 is open source under Apache 2.0. `pxm` Cloud, with private prompt registries for your organization, is in private beta.

Documentation: `docs.pxm.dev`
