# Project collaboration rules

## Git is the shared source of truth

- Treat the root Git repository and its `origin` remote as the source of truth for this entire project. Do not create nested Git repositories inside subfolders.
- Assume the project may also be used from another computer. Before editing, inspect the current branch, working tree, and upstream divergence with read-only Git commands.
- Preserve all existing local changes. Never discard, overwrite, reset, stash, commit, pull, merge, rebase, or push the user's work unless the user has authorized that operation.
- Before starting new work, warn the user if the branch is behind its upstream, has diverged, or contains local changes that could conflict with synchronization.
- Avoid concurrent work on this project from two computers, especially on the same files. Working repeatedly on the project from one computer on the same day is safe.
- Recommended handoff between computers: finish a coherent change, commit it, push it, then pull before beginning work on the other computer.
- Keep generated dependencies, build output, caches, local environment files, secrets, and temporary files out of Git unless the user explicitly decides otherwise.
- Remember that ignored files and empty directories are not synchronized by Git. Flag any user-owned source or content directory that is ignored and therefore will not reach the other computer.
- For substantial changes, always work on a dedicated branch, push it, and open a Pull Request against `main`; do not merge substantial work directly into `main`.
