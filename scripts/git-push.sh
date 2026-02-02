#!/bin/bash
# Git Push Helper Script for Al Sultan PMC

echo "🚀 Al Sultan PMC - Git Push Helper"
echo "===================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized"
    echo "Run: git init"
    exit 1
fi

# Check if remote is set
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "❌ Git remote 'origin' not set"
    echo ""
    echo "Usage:"
    echo "  git remote add origin <YOUR_REPO_URL>"
    echo ""
    echo "Example:"
    echo "  git remote add origin https://github.com/yourusername/alsultan-pmc.git"
    exit 1
fi

echo "📋 Current Status:"
echo ""
git status --short
echo ""

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Staging all changes..."
    git add .
    echo ""
    
    echo "💬 Commit message:"
    read -p "Enter commit message (or press Enter for default): " commit_msg
    
    if [ -z "$commit_msg" ]; then
        commit_msg="Update: Al Sultan PMC website improvements"
    fi
    
    echo ""
    echo "📦 Committing changes..."
    git commit -m "$commit_msg"
else
    echo "✓ No uncommitted changes"
fi

echo ""
echo "🔍 Current branch:"
git branch --show-current
echo ""

# Ask for branch
read -p "Push to branch (default: main): " branch
if [ -z "$branch" ]; then
    branch="main"
fi

# Check if branch exists
if ! git show-ref --verify --quiet refs/heads/"$branch"; then
    echo "📌 Creating branch: $branch"
    git branch -M "$branch"
fi

echo ""
echo "🚀 Pushing to origin/$branch..."
git push -u origin "$branch"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to origin/$branch!"
    echo ""
    echo "🌐 Next steps:"
    echo "  1. Go to your repository on GitHub/GitLab/Bitbucket"
    echo "  2. Connect to Netlify or Vercel"
    echo "  3. Your site will deploy automatically!"
else
    echo ""
    echo "❌ Push failed. Please check your credentials and remote URL."
    exit 1
fi
