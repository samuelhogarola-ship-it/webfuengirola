export default {
  baseUrl: 'http://localhost:3456',
  webServer: {
    command: 'npx serve . -p 3456',
    cwd: '/Users/sam/Desktop/webs/web fuengirola',
    url: 'http://localhost:3456',
    reuseExistingServer: !process.env.CI,
    timeout: 10000
  },
  pages: ['/', '/casos/', '/legal.html'],
  navigation: {
    enabled: true,
    expectedLinks: ['/', '/casos/', '/legal.html'],
    linkScopeSelectors: ['nav', 'footer']
  },
  seo: true,
  whatsapp: true,
  forms: [],
  console: {
    ignoreMessages: [
      'favicon.ico',
      'preloaded but not used',
      'Source Map',
      'googletagmanager.com/gtag/js?id=G-V7KY8FGLM5',
      'Failed to load resource: net::ERR_NAME_NOT_RESOLVED'
    ]
  }
};
