import { FigmaParser } from './index';

const figmaParser = new FigmaParser({
  fetcherOptions: {
    accessToken: 'figd_K7QbLmTsH9N0sCv727qvcVTNdgytcEj40zJ2v27u',
    // fileKey: 'PRZjJMfCOzNuUFv8lGfCf5',
    fileKey: 'Dr7y2hhRQrCgWvv1uNIwLR',
  },
  themePrefix: /theme-.+/,
})

figmaParser.run()
