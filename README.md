# CVRP-DRL-GA Frontend

Modern web interface for visualizing and comparing solutions to the Capacitated Vehicle Routing Problem (CVRP) using different solving approaches.

## 📋 Overview

This React-based frontend provides an intuitive interface to:
- Create and manage CVRP instances (random, clustered, or custom uploads)
- Configure and run three different solving algorithms
- Compare algorithm performance side-by-side
- Visualize routes on interactive maps
- Analyze convergence patterns and metrics

## 🎯 Features

### 🏠 Home Page
- Welcome screen with introduction to CVRP
- Quick access to main features
- Algorithm selection cards (NeuroGen, Pure GA, DRL)

### 📦 Instance Management
Three ways to create CVRP instances:
1. **Random Generation**: Uniformly distributed customers
2. **Clustered Generation**: Geographically clustered customers
3. **File Upload**: Upload standard VRP format files

View, select, and delete existing instances.

### ⚖️ Algorithm Comparison
Interactive comparison interface featuring:
- **Side-by-side results** for two algorithms
- **Real-time metrics**: Initial/Final fitness, vehicles used, execution time
- **Convergence charts**: Generation-by-generation fitness evolution with hover tooltips
- **Route visualization**: Interactive maps with zoom, pan, and reset controls
- **Route details**: Expandable list showing customer sequences and demands
- **Winner indication**: Automatic highlighting of best-performing algorithm

### 🎨 Modern UI/UX
- Dark theme optimized for extended use
- Smooth animations and transitions
- Responsive design for various screen sizes
- Custom styled scrollbars
- Toast notifications for user feedback
- Modal dialogs for configuration

## 🏗️ Project Structure

```
src/
├── components/
│   ├── features/          # Feature-specific components
│   │   ├── comparison/    # Algorithm comparison UI
│   │   └── instances/     # Instance management UI
│   └── ui/                # Reusable UI components
├── pages/                 # Page components
│   ├── home/
│   ├── instances/
│   └── comparison/
├── services/              # API client
│   └── api/
│       ├── drl/           # DRL endpoints
│       ├── instances/     # Instance endpoints
│       └── solve/         # Solving endpoints
├── contexts/              # React context providers
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
└── layout/                # Layout components
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Backend API running ([see backend README](https://github.com/natandreli/CVRP-DRL-GA-backend.git))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/natandreli/CVRP-DRL-GA-frontend.git
   cd CVRP-DRL-GA-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Edit `src/config/index.ts` to point to your backend:
   ```typescript
   export const API_BASE_URL = 'http://localhost:8000'
   ```

### Running the Application

**Development mode with hot reload:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

The application will be available at `http://localhost:5173` (or the next available port)

## 🧪 Development

### Code Quality

**Type checking:**
```bash
npm run type-check
```

**Linting:**
```bash
npm run lint
```

**Auto-fix linting issues:**
```bash
npm run lint:fix
```

**Format code:**
```bash
npm run format
```

**Run all validations:**
```bash
npm run validate
```

## 🎨 Styling

The project uses:
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Global styles and animations in `globals.css`
- **Framer Motion** - Smooth animations
- **Custom scrollbar** - Themed scrollbars matching dark mode

## 📊 Key Components

### Algorithm Result Card
Displays comprehensive results for each algorithm:
- Metrics cards (fitness, vehicles, time)
- Interactive route visualization with zoom/pan
- Route details with customer sequences
- Hover states and transitions

### Convergence Chart
Line chart showing algorithm convergence:
- X-axis: Generation number
- Y-axis: Fitness value
- Hover tooltip showing generation and fitness
- Vertical cursor line for precise tracking
- Synchronized y-axis domains for fair comparison

### Route Visualization
SVG-based route rendering:
- Color-coded routes per vehicle
- Customer nodes with IDs
- Depot highlighted in red
- Zoom controls (in/out/reset)
- Mouse wheel zoom support
- Click and drag to pan

### Configuration Forms
Dynamic forms for algorithm parameters:
- GA: population size, generations, rates
- DRL: preset selection, population, generations
- Real-time validation
- Preset loading

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Tabler Icons** - Icon library
- **Sonner** - Toast notifications

## 🎯 User Workflows

### Solving a CVRP Instance

1. **Navigate to Instances** page
2. **Create or select** an instance
3. **Go to Comparison** page
4. **Select the instance** from dropdown
5. **Configure algorithms** (click on algorithm cards)
6. **Click "Run Comparison"**
7. **Analyze results** - view metrics, charts, and routes
8. **Compare winners** - automatic best solution highlighting

### Creating an Instance

**Random Generation:**
- Set number of customers (1-200)
- Set vehicle capacity
- Set grid size

**Clustered Generation:**
- Set number of customers
- Set number of clusters
- Set vehicle capacity

**Upload File:**
- Choose VRP format file
- File parsed automatically

## 📱 Responsive Design

The application adapts to different screen sizes:
- **Desktop**: Full side-by-side comparison
- **Tablet**: Stacked layout with preserved features
- **Mobile**: Single column, optimized controls

## 🎨 Theme

Custom dark theme with:
- **Primary**: Blue (#3f68f2)
- **Background**: Dark blue (#090b0d)
- **Text**: Light slate
- **Accents**: Cyan, emerald, sky

## 🐛 Known Issues

- Large instances (>150 customers) may require zoom adjustment for optimal visualization
- Route visualization performance may vary on older browsers

## 🔮 Future Enhancements

- Export solutions to various formats
- Allow upload CVRP intances files
- Batch comparison of multiple algorithms
- Historical run comparison
- 3D route visualization

## 📄 License

![License](https://img.shields.io/badge/License-MIT-yellow)

## 👥 Authors

Natalia Andrea García Ríos
natalia.garcia9@udea.edu.co
ngarciarios2001@gmail.com