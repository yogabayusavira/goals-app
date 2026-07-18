# Goals App — Build Rules

## Version bump
Before `npm run tauri build` (or any build command), bump version by +1 in both:
- `package.json`
- `src-tauri/Cargo.toml`

Increment the patch number. If current is `0.8.10`, next is `0.8.11`.

## Commit
After build, commit version bump with message:
```
chore: bump version to <new-version>
```
