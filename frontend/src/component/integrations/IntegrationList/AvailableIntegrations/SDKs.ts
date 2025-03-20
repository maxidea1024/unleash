interface ISdk {
  name: string;
  displayName: string;
  description: string;
  documentationUrl: string;
  type: 'server' | 'client';
}

export const OFFICIAL_SDKS: ISdk[] = [
  {
    name: 'go',
    displayName: 'GO SDK',
    description: 'Official Ganpa Client for Go',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/go',
    type: 'server',
  },
  {
    name: 'java',
    displayName: 'Java SDK',
    description: 'Official Ganpa Client for Java',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/java',
    type: 'server',
  },
  {
    name: 'node',
    displayName: 'Node.js SDK',
    description: 'Official Ganpa Client for Node.js',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/node',
    type: 'server',
  },
  {
    name: 'php',
    displayName: 'PHP SDK',
    description: 'Official Ganpa Client for PHP',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/php',
    type: 'server',
  },
  {
    name: 'python',
    displayName: 'Python SDK',
    description: 'Official Ganpa Client for Python',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/python',
    type: 'server',
  },
  {
    name: 'ruby',
    displayName: 'Ruby SDK',
    description: 'Official Ganpa Client for Ruby',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/ruby',
    type: 'server',
  },
  {
    name: 'rust',
    displayName: 'Rust SDK',
    description: 'Official Ganpa Client for Rust',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/rust',
    type: 'server',
  },
  {
    name: 'dotnet',
    displayName: '.NET SDK',
    description: 'Official Ganpa Client for .NET',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/dotnet ',
    type: 'server',
  },
  {
    name: 'android',
    displayName: 'Android SDK',
    description: 'Official Ganpa Client for Android',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/android-proxy',
    type: 'client',
  },
  {
    name: 'flutter',
    displayName: 'Flutter Proxy SDK',
    description: 'Official Ganpa Client for Flutter',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/flutter',
    type: 'client',
  },
  {
    name: 'swift',
    displayName: 'Swift Proxy SDK',
    description: 'Official Ganpa Client for iOS',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/ios-proxy',
    type: 'client',
  },
  {
    name: 'javascript',
    displayName: 'Javascript Proxy SDK',
    description: 'Official Ganpa Client for Javascript',
    documentationUrl:
      'https://docs.getunleash.io/reference/sdks/javascript-browser',
    type: 'client',
  },
  {
    name: 'react',
    displayName: 'React Proxy SDK',
    description: 'Official Ganpa Client for React',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/react',
    type: 'client',
  },
  {
    name: 'svelte',
    displayName: 'Svelte Proxy SDK',
    description: 'Official Ganpa Client for Svelte',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/svelte',
    type: 'client',
  },
  {
    name: 'vue',
    displayName: 'Vue Proxy SDK',
    description: 'Official Ganpa Client for Vue',
    documentationUrl: 'https://docs.getunleash.io/reference/sdks/vue',
    type: 'client',
  },
];
