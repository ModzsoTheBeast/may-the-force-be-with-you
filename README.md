# May The Force Be With You

## Project Description

A Star Wars-themed Angular application that simulates combat between light and dark side characters. Users can select and customize characters before engaging them in turn-based combat simulations.

### Key Features

- Character selection and customization
- Turn-based combat simulation
- Light side vs. Dark side character battles
- User authentication system
- Responsive design for different screen sizes

## Project Structure

```
may-the-force-be-with-you/
├── src/                # Source files
│   ├── app/            # Application components
│   │   ├── login/      # Authentication components
│   │   ├── character-select/ # Character selection interface
│   │   ├── character-edit/   # Character customization
│   │   ├── simulation/       # Combat simulation components
│   │   ├── @shared/          # Shared utilities and components
│   │   └── @types/           # TypeScript type definitions
│   ├── theme/          # Theme styling
│   └── environments/   # Environment configurations
```

The application follows Angular best practices with component-based architecture, routing, and services.

## Technologies

### Frontend

- Angular (v19.2.0)
- TypeScript
- HTML
- SCSS

### Libraries & Tools

- RxJS for reactive programming
- Bootstrap (v5.3.6) for UI components
- Swiper (v11.2.6) for carousel elements
- ESLint & Prettier for code quality
- Angular CLI for development workflows
- Karma & Jasmine for testing

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)
- Angular CLI (v19.2.11)

### Installation

1. Clone the repository

   ```bash
   git clone <!-- Missing: Repository URL -->
   cd may-the-force-be-with-you
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Configuration

No additional configuration is needed to start the application locally.

## Usage Guide

### Running Locally

Start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

### Available Commands

#### Code Scaffolding

Generate new components, directives, pipes, services, etc:

```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module name
```

For a complete list of available schematics:

```bash
ng generate --help
```

#### Building for Production

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. This uses the production configuration by default.

#### Running Tests

Execute unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```

#### Code Formatting and Linting

Format code with Prettier and fix linting issues:

```bash
npm run format
```

Run just the linter:

```bash
npm run lint
```

### Feature Usage

1. Log in to access the application
2. Select a character from the character selection screen
3. Customize your character in the character edit screen if desired
4. Start a simulation to battle with your character
5. Watch the turn-based combat play out and see who wins

## Future Improvements

Potential enhancements for the application:

- Implement more robust theming system
- Adjust responsiveness, add tablet mode
- Tune animations
- Refactor complex components into smaller, more manageable ones

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
