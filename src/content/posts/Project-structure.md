---
title: 'Project structure'
description: 'The project structure of Litos Theme Project'
pubDate: 2025-05-04
tags: ['Project-structure']
recommend: true
heroImage: 'Project-structure.webp'
ogImage: 'Project-structure.webp'
---

This post will help you quickly understand the project structure of [Litos theme](https://github.com/Dnzzk2/Litos) .

## Project structure

Here, the structure of the project will be presented with basic annotations and explanations.

```tex
Litos
├── .git                                  # Git version control directory for managing project history and collaboration
├── .vscode                               # VS Code workspace configuration directory for development settings
│   ├── extensions.json                   # Specifies recommended VS Code extensions for optimal development experience
│   ├── launch.json                       # Defines debugging configurations for running and testing the application
│   ├── litos.code-snippets.json          # Custom code snippets for rapid content creation and component development
│   └── settings.json                     # Project-specific VS Code editor settings and preferences
├── plugins                               # Custom Markdown plugins for enhanced content formatting
├── public                                # Static assets served directly to clients
│   ├── fonts                             # Custom web fonts for consistent typography
│   ├── hero-images                       # Featured images for blog post headers
│   ├── js/                               # Client-side JavaScript for enhanced interactivity
│   ├── og-images                         # Open Graph images for social media sharing previews
│   ├── projects                          # Project showcase images and assets
│   ├── rss                               # RSS feed related assets
│   │   └── style.xsl                     # XSLT stylesheet for RSS feed rendering in browsers
│   ├── apple-touch-icon.png              # iOS home screen icon (180x180px)
│   ├── favicon-16x16.png                 # Small favicon for browser tabs (16x16px)
│   ├── favicon-32x32.png                 # Standard favicon for browser tabs (32x32px)
│   ├── favicon-192x192.png               # Android home screen icon (192x192px)
│   ├── favicon-512x512.png               # PWA icon and splash screen (512x512px)
│   ├── favicon-2048x2048.png             # High-resolution icon for Retina displays
│   ├── favicon.ico                       # Multi-size favicon bundle for legacy browsers
│   ├── favicon.svg                       # Vector favicon for modern browsers
│   └── og-image.jpg                      # Default social media preview image
├── scripts                               # Build and development automation scripts
│   ├── optimize-images.ts                # Script for compressing and optimizing image assets
│   └── utils.ts                          # Shared utilities for build scripts
├── src                                   # Main source code directory
│   ├── assets                            # Development-time assets
│   │   └── images                        # Images processed by Astro's optimization pipeline
│   ├── components                        # Reusable UI components
│   │   ├── base                          # Core UI elements and primitives
│   │   ├── posts                         # Blog post specific components
│   │   │   ├── card                      # Post preview cards and list items
│   │   │   ├── layouts                   # Post-specific layout variations
│   │   │   ├── toc                       # Table of contents components
│   │   │   └── base                      # Shared post components
│   │   └── theme                         # Theme customization components
│   ├── content                           # Content management directory
│   │   ├── posts                         # Blog post markdown files
│   │   └── config.ts                     # Content schema and validation configuration
│   ├── layouts                           # Page layout templates
│   │   ├── Footer.astro                  # Site-wide footer component
│   │   ├── Header.astro                  # Site-wide header and navigation
│   │   └── Layout.astro                  # Base page layout wrapper
│   ├── lib                               # Shared utility functions and helpers
│   ├── pages                             # Route definitions and page components
│   │   ├── api                           # API route handlers
│   │   │   └── github.ts                 # GitHub integration API endpoints
│   │   ├── posts                         # Blog post routes
│   │   │   ├── [...page].astro           # Paginated post listing
│   │   │   └── [...slug].astro           # Individual post pages
│   │   ├── projects                      # Project showcase section
│   │   │   └── index.astro               # Project gallery page
│   │   ├── tags                          # Tag-based navigation
│   │   │   ├── [tag]                     # Tag-specific post listings
│   │   │   │   └── [...page].astro       # Paginated tag results
│   │   │   └── index.astro               # Tag cloud and overview
│   │   ├── 404.astro                     # Custom error page
│   │   ├── index.astro                   # Site homepage
│   │   └── rss.xml.js                    # RSS feed generation script
│   ├── stores                            # State management
│   │   └── theme.ts                      # Theme preferences and settings store
│   ├── styles                            # Global stylesheets
│   │   ├── global.css                    # Site-wide base styles
│   │   ├── picture.css                   # Image and media styles
│   │   └── pro.css                       # Professional/premium feature styles
│   ├── config.ts                         # Application configuration
│   ├── env.d.ts                          # Environment variable type definitions
│   └── types.ts                          # Global TypeScript type definitions
├── .editorconfig                         # Cross-editor coding style definitions
├── .env.example                          # Environment variable template
├── .gitignore                            # Version control exclusion patterns
├── .prettierignore                       # Code formatting exclusion patterns
├── .prettierrc                           # Code formatting rules
├── astro.config.mjs                      # Astro framework configuration
├── ec.config.mjs                         # EditorConfig settings
├── package.json                          # Project metadata and dependencies
├── pnpm-lock.yaml                        # Dependency version lock file
├── README.md                             # Project documentation and setup guide
└── tsconfig.json                         # TypeScript compiler configuration
```
