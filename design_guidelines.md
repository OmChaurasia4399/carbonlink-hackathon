# CarbonLink Design Guidelines

## Design Approach & Philosophy

**Hybrid Approach:** Combining engagement-focused design for education/action tracking with precision-focused design for market intelligence.

**Primary References:**
- **Part 1 (Learn & Earn):** Duolingo (gamification), iNaturalist (community verification), Notion (structured content)
- **Part 2 (Market & Trade):** Bloomberg Terminal (data density), Carbon Design System (enterprise clarity), TradingView (chart elegance)

**Core Principles:**
1. **Dual Identity Unity:** Seamless transition between educational warmth and analytical precision
2. **Trust Through Transparency:** Clear data visualization and verification processes
3. **Action-Oriented Design:** Every screen guides users toward meaningful engagement

## Color Palette

**Primary Colors:**
- **Forest Green:** 150 55% 45% (primary brand, eco-actions, verified status)
- **Deep Earth:** 25 20% 25% (dark mode backgrounds, text)
- **Clean White:** 0 0% 98% (light mode backgrounds)

**Data Visualization Colors:**
- **Growth Green:** 140 60% 50% (positive trends, CO2 reduction)
- **Alert Amber:** 35 85% 55% (pending verifications, warnings)
- **Market Blue:** 210 70% 50% (market data, company profiles)
- **Neutral Slate:** 220 15% 60% (secondary information)

**Accent Colors (Use Sparingly):**
- **Impact Gold:** 45 80% 60% (achievements, badges, milestones)
- **Data Purple:** 270 50% 55% (sentiment indicators, predictions)

## Typography

**Font Families:**
- **Primary:** Inter (headings, UI elements, data tables)
- **Secondary:** Source Sans Pro (body text, descriptions)
- **Monospace:** JetBrains Mono (numerical data, timestamps, coordinates)

**Type Scale:**
- **Hero Headlines:** text-5xl to text-6xl, font-bold
- **Section Headers:** text-3xl to text-4xl, font-semibold
- **Card Titles:** text-xl, font-medium
- **Body Text:** text-base, font-normal
- **Data Labels:** text-sm, font-medium
- **Captions/Metadata:** text-xs to text-sm, uppercase tracking-wide

## Layout System

**Spacing Primitives:** Consistently use Tailwind units of 2, 4, 8, 12, and 16 (p-2, m-4, gap-8, py-12, px-16)

**Container Strategy:**
- **Full-Width Sections:** w-full with inner max-w-7xl mx-auto
- **Content Sections:** max-w-6xl
- **Reading Content:** max-w-prose
- **Data Tables:** w-full with horizontal scroll on mobile

**Grid Systems:**
- **Dashboard Layouts:** 12-column grid (grid-cols-12)
- **Feature Cards:** 3-column desktop (lg:grid-cols-3), 1-column mobile
- **Market Data:** Flexible multi-column with sidebar (2/3 main + 1/3 sidebar)

## Component Library

### Navigation
- **Dual-Mode Navigation:** Clear visual distinction between "Learn & Earn" and "Market & Trade" sections
- **Top Bar:** Logo left, section switcher center, user profile/notifications right
- **Section Indicators:** Color-coded tabs (green for eco, blue for market)
- **Mobile:** Collapsible hamburger with section-based organization

### Cards & Containers
- **Eco-Action Cards:** Rounded corners (rounded-xl), subtle shadows, image thumbnails, progress indicators
- **Market Data Cards:** Sharp corners (rounded-lg), bordered, data-dense layouts
- **Verification Queue:** List view with expandable details, status badges
- **Company Profiles:** Two-column layout (metrics left, news/sentiment right)

### Data Visualization
- **Charts:** Use Chart.js or Recharts with consistent color mapping
- **Progress Bars:** Gradient fills showing CO2 reduction progress
- **Sentiment Indicators:** Color-coded arrows/badges with percentage changes
- **Historical Graphs:** Line charts with area fills, interactive tooltips

### Forms & Inputs
- **Eco-Action Forms:** Multi-step wizard with progress indicator
- **File Upload:** Drag-and-drop zones with image preview
- **GPS Capture:** Interactive map with pin placement
- **Search/Filters:** Sticky filter bars for market data tables

### Badges & Gamification
- **Achievement Badges:** Circular icons with metallic gradient effects
- **Status Indicators:** Colored dots/pills (green verified, amber pending, gray draft)
- **Leaderboards:** Compact table view with rank, avatar, metrics
- **Impact Metrics:** Large numerical displays with animated count-ups

### CTAs & Buttons
- **Primary Actions:** Solid forest green (hover: darker), rounded-lg, font-semibold
- **Secondary Actions:** Outline style with transparent bg and colored border
- **Data Actions:** Smaller, subtle buttons (text-sm) for table actions
- **Hero CTAs:** Larger scale (px-8 py-4) with subtle shadow

## Page-Specific Layouts

### Landing Page (Marketing)
- **Hero:** Full-width split design - left side: headline "Bridge Your Impact to the Carbon Market" + dual CTAs ("Start Earning Credits" + "Explore Market Data"), right side: hero image showing diverse eco-actions (tree planting, solar panels, farming)
- **Value Proposition:** 3-column grid explaining dual platform benefits
- **How It Works:** Alternating left/right layout showing Learn → Apply → Earn flow and Market Intelligence flow
- **Impact Showcase:** Stats counter (trees planted, CO2 offset, users) with background image
- **Trust Signals:** Logos of partner organizations, verification standards
- **Dual CTAs:** Separate entry points for individual contributors vs. market analysts

### Learn & Earn Dashboard
- **Profile Header:** Avatar, username, total CO2 offset (large display), rank badge
- **Quick Actions:** Grid of eco-action categories with icons
- **Active Projects:** Timeline view of submitted/pending/verified actions
- **Impact Visualization:** Circular progress chart showing monthly goals
- **Knowledge Feed:** Card-based layout of recommended learning modules

### Market Intelligence Dashboard
- **Market Overview:** Top section with key metrics (current price, 24h change, volume)
- **Price Chart:** Large interactive chart (2/3 width) with timeframe selectors
- **Sidebar:** Top movers, recent trades, sentiment summary
- **Company Grid:** Filterable table/card view of companies with ESG scores
- **News Feed:** Scrollable list with sentiment tags (positive/negative/neutral)

### Verification Admin Panel
- **Queue Table:** List view with thumbnail, user, action type, submission date
- **Detail Modal:** Large image viewer, GPS map, metadata, approve/reject actions
- **Bulk Actions:** Select multiple, batch approve
- **Analytics:** Verification stats, average processing time

## Images

**Hero Section:** Use a compelling hero image showing diverse eco-actions in a montage or split-screen format - tree planting, solar installation, sustainable farming. The image should convey both individual action and global impact. Image placement: Right side of hero (50% width on desktop), below headline on mobile.

**Section Backgrounds:** Subtle nature-inspired textures or gradients for eco-sections, clean solids for market sections.

**User-Generated Content:** Eco-action proof images prominently displayed in cards with rounded corners and subtle borders.

**Company Profiles:** Corporate logos and facility images where available.

**Iconography:** Use Heroicons for UI elements, custom eco-themed icons for action categories (tree, sun, water drop, wind turbine).

## Animations

**Minimal & Purposeful:**
- **Number Count-ups:** Animated increment for impact statistics
- **Chart Transitions:** Smooth data updates with fade/slide
- **Card Hovers:** Subtle lift (translate-y-1) with shadow increase
- **Status Changes:** Color transition for verification approvals
- **Page Transitions:** Simple fade between sections

**Avoid:** Excessive scroll-triggered animations, distracting parallax effects

## Dark Mode Implementation

**Consistent Across All Elements:**
- **Backgrounds:** Deep earth tones (25 20% 15% for main, 25 15% 20% for cards)
- **Text:** White/off-white (0 0% 95%) for primary, slate (220 15% 70%) for secondary
- **Inputs:** Slightly lighter than background (25 15% 22%) with visible borders
- **Charts:** Inverted axis colors, maintain data color consistency
- **Images:** Optional subtle overlay to blend with dark backgrounds