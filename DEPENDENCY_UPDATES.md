# Dependency Management

## Automated Updates

This project is configured with two automated dependency management tools:

### 1. GitHub Dependabot (`.github/dependabot.yml`)
- **Weekly updates**: Every Monday at 9:00 AM
- **Daily security checks**: Immediate alerts for vulnerabilities
- **Grouped updates**: Related packages updated together (Astro, React, Tailwind, etc.)
- **Auto-labels**: PRs automatically tagged with `dependencies`, `security`

**Features:**
- ✅ Automatic security patches
- ✅ Grouped dependency updates
- ✅ Major version updates require manual review
- ✅ Separate PRs for security issues

### 2. Renovate Bot (`renovate.json`)
Alternative to Dependabot with more features:
- **Weekly updates**: Monday mornings (Qatar timezone)
- **Auto-merge**: Patch updates and dev dependencies
- **Lock file maintenance**: Monthly on 1st day
- **Vulnerability alerts**: Immediate security updates

**Features:**
- ✅ More granular control
- ✅ Automatic patch/minor version merging
- ✅ Works with GitLab, Bitbucket, Azure DevOps
- ✅ Semantic commit messages

## Manual Updates

### Quick Update Script
```bash
./scripts/update-deps.sh
```

Interactive script with options:
1. Interactive update (review each package)
2. Safe patch updates only
3. Security fixes only

### Manual Commands

**Check outdated packages:**
```bash
pnpm outdated
```

**Update specific package:**
```bash
pnpm update <package-name>@latest
```

**Update all to latest:**
```bash
pnpm update --latest
```

**Security audit:**
```bash
pnpm audit
pnpm audit fix
```

**Interactive update:**
```bash
pnpm update -i
```

## Update Strategy

### Production Dependencies
- **Patch updates** (1.0.x): Auto-merge ✅
- **Minor updates** (1.x.0): Auto-merge with CI checks ✅
- **Major updates** (x.0.0): Manual review required ⚠️

### Dev Dependencies
- **All updates**: Auto-merge if tests pass ✅

### Security Updates
- **All severity levels**: Immediate auto-merge 🔒

## Package Groups

Dependencies are grouped for easier management:

| Group | Packages |
|-------|----------|
| **Astro** | `astro`, `@astrojs/*` |
| **React** | `react`, `react-dom`, `@types/react*` |
| **Lucide** | `@lucide/*`, `lucide-react` |
| **Tailwind** | `tailwindcss`, `tailwind-merge` |
| **Dev Tools** | All devDependencies |

## CI/CD Integration

After updates, the following checks run automatically:
1. ✅ TypeScript compilation (`astro check`)
2. ✅ Build succeeds (`pnpm run build`)
3. ✅ No new security vulnerabilities
4. ✅ Lock file is valid

## Best Practices

1. **Review major updates** before merging
2. **Test locally** after dependency updates
3. **Keep lock file** committed
4. **Monitor build logs** for deprecation warnings
5. **Update regularly** (weekly recommended)

## Troubleshooting

**Clear cache if updates fail:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Force update specific package:**
```bash
pnpm update <package> --force
```

**Check for breaking changes:**
```bash
pnpm outdated
# Visit package GitHub/CHANGELOG for migration guides
```

## Current Status

Last updated: 2 February 2026

**Secure versions:**
- ✅ Astro: v5.17.1 (all vulnerabilities patched)
- ✅ React: v18.3.1 (stable)
- ✅ Lucide: v0.563.0 (latest)
- ✅ Tailwind: v3.4.19 (latest v3)

**Known issues:**
- ⚠️ 1 moderate vulnerability in `lodash` (dev dependency only, not exploitable in production)
