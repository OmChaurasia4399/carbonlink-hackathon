# CarbonLink

## Overview

CarbonLink is a dual-purpose platform that bridges carbon credit harvesters (individuals, farmers, small organizations) with market participants (companies, investors, analysts). The platform combines educational content and engagement tools for carbon credit generation with data-driven carbon credit trading insights.

The platform is divided into two main components:

1. **Learn & Earn** - Education, onboarding, and generation of carbon credits through documented eco-actions
2. **Market & Trade** - Real-time market intelligence, company analysis, and carbon credit trading capabilities

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React with TypeScript for type safety and component-based architecture
- Vite for fast development builds and Hot Module Replacement (HMR)
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and caching

**UI Component Strategy:**
- Shadcn/ui components with Radix UI primitives for accessibility
- Tailwind CSS for utility-first styling with custom design system
- Custom theme system supporting light/dark modes with CSS variables
- Component library follows "New York" style variant from Shadcn

**Design System:**
- Hybrid approach combining engagement-focused design (Duolingo-inspired gamification) with precision-focused design (Bloomberg Terminal-inspired data density)
- Custom color palette using HSL values for Forest Green primary brand, with specialized data visualization colors
- Typography system using Inter (UI/headings), Source Sans Pro (body), and JetBrains Mono (data/timestamps)
- Consistent spacing primitives based on Tailwind's scale (2, 4, 8, 12, 16)

**State Management:**
- React Query for API data fetching and caching with infinite stale time
- React Context for theme management
- Local component state for UI interactions
- Query invalidation strategy for real-time data updates

**Key Architectural Decisions:**
- Client-side routing without server-side rendering (SPA architecture)
- API requests include credentials for session-based authentication
- Centralized query client with custom error handling for 401 responses
- Component-level code splitting through route-based lazy loading potential

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for API routing and middleware
- HTTP server creation through Node's built-in http module
- Custom middleware for request/response logging and JSON body parsing

**API Design:**
- RESTful API structure under `/api` prefix
- Portfolio management endpoints (`/api/portfolio`, `/api/trades`)
- Trading operations (`/api/trade/buy`, `/api/trade/sell`)
- Session-based user identification (currently using demo user ID, auth system to be implemented)

**Development Workflow:**
- Vite integration in development mode with middleware mounting
- Hot module reloading for rapid development iteration
- Custom error overlay plugin for runtime error debugging
- Development banners and cartographer tooling for Replit environment

**Data Layer Abstraction:**
- Storage interface pattern (`IStorage`) for database operations
- Separation of concerns between route handlers and data access
- Repository pattern implementation in `DatabaseStorage` class

### Data Storage

**Database Solution:**
- PostgreSQL via Neon serverless platform
- WebSocket-based connection pooling for serverless compatibility
- Drizzle ORM for type-safe database queries and schema management

**Schema Design:**
- `users` table: User authentication and balance tracking
- `portfolios` table: User carbon credit holdings per project
- `trades` table: Transaction history with project details and timestamps
- UUID primary keys with `gen_random_uuid()` for distributed system readiness
- Decimal precision (10,2) for financial calculations to avoid floating-point errors

**Schema Management:**
- Drizzle Kit for schema migrations and database push operations
- Zod schema validation integrated with Drizzle for runtime type checking
- Schema definitions in shared folder for client/server code reuse

**Key Design Decisions:**
- Denormalized project names in portfolio and trades tables for query performance
- Separate average price tracking in portfolio for cost basis calculations
- Timestamp tracking on trades for audit trail and historical analysis

### Authentication & Authorization

**Current Implementation:**
- Placeholder demo user system (`demo-user-123`)
- Session-based authentication infrastructure prepared
- User balance and portfolio tied to user ID

**Planned Architecture:**
- Session management using `connect-pg-simple` for PostgreSQL-backed sessions
- Password hashing for secure credential storage
- Role-based access control for Learn & Earn vs. Market & Trade features

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless** - PostgreSQL database connection with WebSocket support
- **drizzle-orm** - Type-safe ORM for database queries
- **express** - Web server framework for API routes
- **react** + **react-dom** - UI rendering library
- **vite** - Build tool and development server
- **wouter** - Lightweight routing library

### UI Component Libraries
- **@radix-ui/** (multiple packages) - Accessible, unstyled component primitives
- **recharts** - Charting library for data visualization
- **lucide-react** - Icon library
- **cmdk** - Command menu component
- **embla-carousel-react** - Carousel/slider component

### Data Management
- **@tanstack/react-query** - Server state management and caching
- **react-hook-form** + **@hookform/resolvers** - Form state and validation
- **zod** - Runtime type validation and schema definition
- **date-fns** - Date manipulation and formatting

### Styling & Design
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Variant-based component styling
- **clsx** + **tailwind-merge** - Conditional class name utilities

### Development Tools
- **@replit/vite-plugin-*** - Replit-specific development tooling
- **typescript** - Type checking and compilation
- **esbuild** - Server-side bundling for production

### Third-Party Integrations (Planned)
- Carbon market data APIs for real-time pricing
- Geolocation services for eco-action verification
- Image storage services for proof uploads
- Video hosting platform for educational tutorials
- Email service for notifications and verification workflows