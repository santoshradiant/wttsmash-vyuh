# Vyuh React Workspace

A modern, feature-based React application workspace built with Next.js and
Sanity CMS integration. This workspace provides a structured approach to
building scalable React applications with a focus on feature modularity.

## Project Structure

The workspace follows a monorepo structure using PNPM workspaces:

```
vyuh-react-workspace/
├── apps/                      # Application packages
│   └── main-app/              # Main Next.js application
│       ├── app/               # Next.js app directory
│       ├── plugins/           # Application-specific plugins
│       └── ...
├── features/                  # Feature packages
│   └── misc/                  # Example "Miscellaneous" feature
│       ├── react-feature-misc/    # React implementation
│       ├── sanity-schema-misc/    # Sanity schema definition
│       └── ...
├── packages/                  # Shared packages
├── pnpm-workspace.yaml        # PNPM workspace configuration
└── README.md                  # This file
```

## Main Application

The main application is a Next.js app located in `apps/main-app/`. It serves as
the entry point for the entire application and integrates all features.

Key aspects:

- Built with Next.js 15 and React 19
- Uses the App Router for routing
- Integrates with Sanity CMS for content management
- Implements the Vyuh framework for feature management

### Environment Variables

Add the necessary environment variables to your `.env.local` file in the main
app directory. These values will come from the Sanity Studio project that you'll generate in the section below:

```
# Use the values from your Sanity Studio project
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id  # From the Sanity Studio setup
NEXT_PUBLIC_SANITY_DATASET=production          # The dataset you create in Sanity
NEXT_PUBLIC_SANITY_TOKEN=your-sanity-token     # Generate this in the Sanity dashboard
```

> **Note**: You'll need to create the Sanity Studio project first (as described in the Sanity Studio Integration section below) and then use the project ID, dataset name, and token from that setup in these environment variables.

## Features Structure

Features are organized in a modular way, with each feature having its own
directory structure:

```
features/
└── feature-name/
    ├── react-feature-name/    # React implementation
    │   ├── src/               # Source code
    │   ├── package.json       # Package configuration
    │   └── tsconfig.json      # TypeScript configuration
    ├── sanity-schema-name/    # Sanity schema definition
    │   ├── src/               # Source code
    │   ├── package.json       # Package configuration
    │   └── tsconfig.json      # TypeScript configuration
    └── ...
```

This structure allows for:

- Clear separation of concerns
- Independent development and testing
- Easy reuse across projects
- Consistent patterns for all features

## Sanity Studio Integration

The project uses Sanity CMS for content management with the Vyuh plugin
structure for enhanced feature management. To set up a Sanity Studio:

1. Create a new Sanity project in the Sanity.io dashboard
2. Install the Sanity CLI: `npm install -g @sanity/cli`
3. Initialize a new Sanity project in the `apps/studio` directory:

```bash
mkdir -p apps/studio
cd apps/studio
sanity init
```

4. Configure your Sanity project with the following settings:

   - Project name: Your project name
   - Dataset: `production` (or your preferred name)
   - Project output path: Current directory (.)

5. Update the Sanity schema to include your feature schemas:

```typescript
// apps/studio/sanity.config.ts
import { vyuh } from '@vyuh/sanity-plugin-structure';
import { system } from '@vyuh/sanity-schema-system';
import { defineConfig } from 'sanity';
import { misc } from 'sanity-schema-wtt';

export default defineConfig({
  name: 'default',
  title: 'Vyuh React',

  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [
    vyuh({
      features: [system, misc],
    }),
  ],
});
```

## Vyuh Plugin Structure

The Vyuh framework uses a plugin-based architecture for Sanity integration. The
`@vyuh/sanity-plugin-structure` package provides a structured way to organize
and manage your content schemas.

### Plugin Configuration

The Vyuh Sanity plugin is configured with an array of features, where each
feature is a `FeatureDescriptor` instance that contains schema definitions and
other configurations:

```typescript
// Import the vyuh plugin from the correct package
import { vyuh } from '@vyuh/sanity-plugin-structure';

// Configure the plugin with your features
vyuh({
  features: [
    system, // System features
    misc, // Your custom features
    // Add more features as needed
  ],
});
```

### Feature Structure

Each feature in the Sanity context is defined using the `FeatureDescriptor`
class from `@vyuh/sanity-schema-core`:

```typescript
// features/your-feature/sanity-schema-yourfeature/src/index.ts
import { FeatureDescriptor } from '@vyuh/sanity-schema-core';
import { APIContentDescriptor } from '@vyuh/sanity-schema-system';
import { yourSchemaType } from './yourSchemaType';

export const yourFeature = new FeatureDescriptor({
  name: 'your-feature',
  title: 'Your Feature',
  description: 'Description of your feature',
  contents: [
    new APIContentDescriptor({
      configurations: [yourSchemaType],
    }),
    // Other content descriptors...
  ],
});
```

This structure allows for a modular approach to content management, where each
feature can define its own schema types and configurations.

## Development Workflow

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   # Start the main app
   cd apps/main-app
   pnpm dev

   # In another terminal, start the Sanity Studio
   cd apps/studio
   pnpm dev
   ```

3. Open your browser:
   - Main app: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio: [http://localhost:3333](http://localhost:3333)

## Creating New Features

To create a new feature, follow the structure of the `misc` feature:

1. Create a new directory in `features/` with your feature name
2. Create two subdirectories:
   - `react-feature-yourfeature/`: React implementation
   - `sanity-schema-yourfeature/`: Sanity schema definition
3. Implement your feature following the patterns in the existing features
4. Add your feature to the main app in `apps/main-app/app/client-root.tsx`
