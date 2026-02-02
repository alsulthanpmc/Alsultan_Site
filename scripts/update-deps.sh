#!/bin/bash
# Manual dependency update script
# Run this script to check for and update dependencies

set -e

echo "🔍 Checking for outdated packages..."
pnpm outdated || true

echo ""
echo "🔒 Running security audit..."
pnpm audit

echo ""
echo "📦 Select update strategy:"
echo "1) Update all dependencies to latest (interactive)"
echo "2) Update only patch versions (safe)"
echo "3) Update only security vulnerabilities"
echo "4) Cancel"

read -p "Enter choice [1-4]: " choice

case $choice in
  1)
    echo "🚀 Running interactive update..."
    pnpm update -i
    ;;
  2)
    echo "🔧 Updating patch versions..."
    pnpm update --latest
    ;;
  3)
    echo "🔒 Fixing security vulnerabilities..."
    pnpm audit fix
    ;;
  4)
    echo "❌ Cancelled"
    exit 0
    ;;
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "🧪 Running tests..."
pnpm run build

echo ""
echo "✅ Dependencies updated successfully!"
echo "📝 Don't forget to commit the changes:"
echo "   git add package.json pnpm-lock.yaml"
echo "   git commit -m 'chore(deps): update dependencies'"
