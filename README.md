# Next.js + Electron Windows App

[![Next.js](https://img.shields.io/badge/Next.js-13.0-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Electron](https://img.shields.io/badge/Electron-28.0-47848F.svg?style=flat-square&logo=electron)](https://www.electronjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A modern desktop application combining the power of Next.js for the frontend and Electron for native desktop capabilities.

## Architecture

```mermaid
graph TD
    subgraph Desktop Application
        E[Electron Main Process]
        R[Electron Renderer Process]

        subgraph Next.js Application
            P[Pages/Routes]
            C[Components]
            A[API Routes]
            S[State Management]
        end

        subgraph Native Features
            IPC[IPC Communication]
            FS[File System]
            OS[OS Integration]
        end
    end

    E --> R
    R --> Next.js Application
    Next.js Application --> P
    Next.js Application --> C
    Next.js Application --> A
    Next.js Application --> S
    E --> Native Features
    Native Features --> IPC
    Native Features --> FS
    Native Features --> OS
    IPC <--> R
```

## Features

- **Modern Web Technologies**: Built with Next.js 13+ for a powerful React-based frontend
- **Desktop Integration**: Full access to native OS features through Electron
- **Type Safety**: Written in TypeScript for better development experience
- **Responsive UI**: Styled with Tailwind CSS for a modern look
- **Hot Reload**: Development environment with hot reload support
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Native Features**: File system access, system tray, notifications, and more
- **Security**: CSP headers and secure IPC communication

## Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Windows 10 or later (for Windows builds)
- Git

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/diyakamboj/windows-electron-app.git
cd windows-electron-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run in development mode:

```bash
npm run dev
# or
yarn dev
```

4. Build for production:

```bash
npm run build
# or
yarn build
```

## Project Structure

```
├── electron/
│   ├── main.ts           # Electron main process
│   ├── preload.ts        # Preload scripts
│   └── utils/            # Electron utilities
├── src/
│   ├── components/       # React components
│   ├── pages/           # Next.js pages
│   ├── styles/          # Global styles
│   └── utils/           # Shared utilities
├── public/              # Static assets
├── package.json
└── tsconfig.json
```

## Development

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME=Your App Name
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run package` - Package the app for distribution
- `npm run make` - Create installers
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Building for Production

1. Update the version in `package.json`
2. Build the application:

```bash
npm run build
npm run package
```

3. Find the packaged application in the `out` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All dependencies are regularly updated
- CSP headers are properly configured
- IPC communication is secured using proper validation
- Native APIs are carefully exposed to prevent security vulnerabilities

## Troubleshooting

### Common Issues

1. **App fails to start**

   - Check Node.js version
   - Clear node_modules and reinstall dependencies
   - Verify electron version compatibility

2. **Build errors**

   - Ensure all dependencies are installed
   - Check for TypeScript errors
   - Verify Next.js configuration

3. **Hot reload not working**
   - Check if you're running in development mode
   - Verify file watching is enabled
   - Check for conflicting processes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Forge](https://www.electronforge.io/)
