# Goals App — Build Rules

## Version bump
Before `npm run tauri build` (or any build command), bump version by +1 in all:
- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`

Increment the patch number. If current is `0.8.10`, next is `0.8.11`.

## Commit
After build, commit version bump with message:
```
chore: bump version to <new-version>
```

## Tag
After build completes successfully, create an annotated git tag matching the version:
```
git tag -a v<new-version> -m "v<new-version>"
```
Push tag with `git push --tags` if remote is configured.
