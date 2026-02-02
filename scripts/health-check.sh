#!/bin/bash
# Component Health Check Script

echo "🔍 Al Sultan PMC - Component Health Check"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check build
echo "📦 Building project..."
if pnpm run build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✓${NC} Build successful"
else
    echo -e "${RED}✗${NC} Build failed"
    echo "Error details:"
    tail -20 /tmp/build.log
    exit 1
fi

echo ""
echo "🔍 Checking Components..."
echo ""

# Check all React components
components=(
    "src/components/QuickStats.tsx"
    "src/components/Departments.tsx"
    "src/components/Services.tsx"
    "src/components/DoctorsSlider.tsx"
    "src/components/ContactForm.tsx"
)

for comp in "${components[@]}"; do
    name=$(basename "$comp" .tsx)
    if [ -f "$comp" ]; then
        # Check for export
        if grep -q "export default function" "$comp"; then
            echo -e "${GREEN}✓${NC} $name - Exported correctly"
        else
            echo -e "${RED}✗${NC} $name - Missing default export"
        fi
        
        # Check for TypeScript types
        if grep -q "interface.*Props" "$comp"; then
            echo -e "  ${GREEN}✓${NC} Has TypeScript types"
        else
            echo -e "  ${YELLOW}⚠${NC} Missing TypeScript types"
        fi
    else
        echo -e "${RED}✗${NC} $name - File not found"
    fi
done

echo ""
echo "🔍 Checking Astro Components..."
echo ""

astro_components=(
    "src/components/Header.astro"
    "src/components/Hero.astro"
    "src/components/About.astro"
    "src/components/WhyChooseUs.astro"
    "src/components/Footer.astro"
    "src/components/WhatsAppButton.astro"
)

for comp in "${astro_components[@]}"; do
    name=$(basename "$comp" .astro)
    if [ -f "$comp" ]; then
        echo -e "${GREEN}✓${NC} $name - Exists"
    else
        echo -e "${RED}✗${NC} $name - File not found"
    fi
done

echo ""
echo "🔍 Checking Data Files..."
echo ""

data_files=(
    "src/data/doctors.json"
    "src/data/contact.json"
    "src/data/stats.json"
)

for file in "${data_files[@]}"; do
    name=$(basename "$file")
    if [ -f "$file" ]; then
        if python3 -m json.tool "$file" > /dev/null 2>&1; then
            echo -e "${GREEN}✓${NC} $name - Valid JSON"
        else
            echo -e "${RED}✗${NC} $name - Invalid JSON"
        fi
    else
        echo -e "${RED}✗${NC} $name - File not found"
    fi
done

echo ""
echo "🔍 Checking Public Assets..."
echo ""

# Check hero image
if [ -f "public/alsultanpmc_hero.jpg" ]; then
    echo -e "${GREEN}✓${NC} Hero image exists"
else
    echo -e "${RED}✗${NC} Hero image missing"
fi

# Check doctor images
doctor_count=$(ls public/Doct*.jpg 2>/dev/null | wc -l)
if [ "$doctor_count" -eq 9 ]; then
    echo -e "${GREEN}✓${NC} All 9 doctor images present"
else
    echo -e "${YELLOW}⚠${NC} Found $doctor_count doctor images (expected 9)"
fi

# Check logo
if [ -f "public/logo.png" ]; then
    echo -e "${GREEN}✓${NC} Logo exists"
else
    echo -e "${RED}✗${NC} Logo missing"
fi

echo ""
echo "🔍 Checking Dependencies..."
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${RED}✗${NC} Dependencies not installed - run 'pnpm install'"
fi

# Check package.json scripts
if grep -q '"dev".*astro dev' package.json; then
    echo -e "${GREEN}✓${NC} Dev script configured"
fi

if grep -q '"build".*astro build' package.json; then
    echo -e "${GREEN}✓${NC} Build script configured"
fi

echo ""
echo "🔍 Security Audit..."
echo ""

vulnerabilities=$(pnpm audit --json 2>/dev/null | jq -r '.metadata.vulnerabilities | to_entries[] | select(.value > 0) | "\(.key): \(.value)"' | wc -l)

if [ "$vulnerabilities" -eq 0 ]; then
    echo -e "${GREEN}✓${NC} No vulnerabilities found"
else
    echo -e "${YELLOW}⚠${NC} Found some vulnerabilities - run 'pnpm audit' for details"
fi

echo ""
echo "=========================================="
echo "✅ Health check complete!"
echo ""
