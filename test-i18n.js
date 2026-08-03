#!/usr/bin/env node

/**
 * End-to-End Translation Test for Kannada & English
 * Tests all pages in both locales
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 5000;

const PAGES = [
  { path: '', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/doctors', name: 'Doctors' },
  { path: '/appointments', name: 'Appointments' },
  { path: '/contact', name: 'Contact' },
  { path: '/gallery', name: 'Gallery' },
  { path: '/empanelments', name: 'Empanelments' },
  { path: '/privacy-policy', name: 'Privacy Policy' },
  { path: '/terms-of-use', name: 'Terms of Use' },
];

const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
];

// Sample Kannada text patterns to verify rendering
const KANNADA_PATTERNS = {
  home: ['ಮುಖಪುಟ', 'ನಿಮ್ಮ ದೃಷ್ಟಿಯ ರಕ್ಷಣೆ', 'ಕಾರವಾರ ಕಣ್ಣಿನ ಆಸ್ಪತ್ರೆ'],
  doctors: ['ವೈದ್ಯರು', 'ತಜ್ಞ ವೈದ್ಯರು', 'ಅನುಭವ'],
  contact: ['ಸಂಪರ್ಕಿಸಿ', 'ಕರೆ ಮಾಡಿ', 'ಇಮೇಲ್'],
  appointments: ['ಅಪಾಯಿಂಟ್ಮೆಂಟ್'],
};

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, TIMEOUT);

    http.get(url, (res) => {
      clearTimeout(timeout);
      
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        res.resume();
        return;
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function hasKannadaText(html) {
  // Check for Kannada Unicode range (U+0C80 to U+0CFF)
  return /[\u0C80-\u0CFF]/.test(html);
}

function findPatterns(html, patterns) {
  return patterns.filter(pattern => html.includes(pattern));
}

async function testPage(locale, page) {
  const url = `${BASE_URL}/${locale}${page.path}`;
  const testName = `${locale.toUpperCase()} - ${page.name}`;
  
  try {
    const html = await fetchPage(url);
    
    // Check for actual error pages (exclude React Server Components metadata)
    // RSC includes metadata like "404: This page could not be found" in the payload
    // but this is not rendered to users - it's just in the data structure
    const visibleErrorPatterns = [
      /<h1[^>]*>\s*404/i,  // 404 in an H1 tag (visible to users)
      /<h2[^>]*>\s*404/i,  // 404 in an H2 tag  
      /<title[^>]*>404/i,  // 404 in title (but not in RSC payload)
      />Page Not Found</i,
      />Not Found</i,
    ];
    
    const hasErrorPage = visibleErrorPatterns.some(pattern => pattern.test(html));
    
    // Basic checks
    const checks = {
      hasContent: html.length > 0,
      hasTitle: html.includes('<title>'),
      hasBody: html.includes('<body'),
      noErrors: !hasErrorPage,
    };

    // Locale-specific checks
    if (locale === 'kn') {
      checks.hasKannadaScript = hasKannadaText(html);
      checks.hasEnglishNav = html.includes('English'); // Language switcher
      
      // Check for specific Kannada patterns based on page
      const pageName = page.path.split('/').filter(Boolean)[0] || 'home';
      if (KANNADA_PATTERNS[pageName]) {
        const foundPatterns = findPatterns(html, KANNADA_PATTERNS[pageName]);
        checks.kannadaPatterns = `${foundPatterns.length}/${KANNADA_PATTERNS[pageName].length} patterns found`;
        checks.hasExpectedContent = foundPatterns.length > 0;
      }
    } else {
      checks.hasKannadaNav = html.includes('ಕನ್ನಡ'); // Language switcher
    }

    const passed = Object.values(checks).every(v => v === true || typeof v === 'string');
    
    console.log(`${passed ? '✅' : '❌'} ${testName.padEnd(30)} ${url}`);
    
    // Show details for failed tests
    if (!passed) {
      Object.entries(checks).forEach(([key, value]) => {
        if (value === false) {
          console.log(`   ❌ ${key}: ${value}`);
        } else if (typeof value === 'string') {
          console.log(`   ℹ️  ${key}: ${value}`);
        }
      });
    }
    
    return { locale, page: page.name, url, passed, checks };
  } catch (error) {
    console.log(`❌ ${testName.padEnd(30)} ${url}`);
    console.log(`   Error: ${error.message}`);
    return { locale, page: page.name, url, passed: false, error: error.message };
  }
}

async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║     End-to-End Translation Test: Kannada & English        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log(`Testing ${PAGES.length} pages × ${LOCALES.length} locales = ${PAGES.length * LOCALES.length} total tests\n`);

  const results = [];

  for (const locale of LOCALES) {
    console.log(`\n━━━ ${locale.name} (${locale.code}) ━━━\n`);
    
    for (const page of PAGES) {
      const result = await testPage(locale.code, page);
      results.push(result);
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Summary
  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                      TEST SUMMARY                          ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = totalTests - passedTests;

  const enResults = results.filter(r => r.locale === 'en');
  const knResults = results.filter(r => r.locale === 'kn');

  console.log(`Total Tests:        ${totalTests}`);
  console.log(`✅ Passed:          ${passedTests}`);
  console.log(`❌ Failed:          ${failedTests}`);
  console.log(`\nEnglish (en):       ${enResults.filter(r => r.passed).length}/${enResults.length} passed`);
  console.log(`Kannada (kn):       ${knResults.filter(r => r.passed).length}/${knResults.length} passed`);

  // Kannada-specific stats
  const knWithKannadaScript = knResults.filter(r => 
    r.checks && r.checks.hasKannadaScript
  ).length;
  
  console.log(`\n📊 Kannada Script Detection: ${knWithKannadaScript}/${knResults.length} pages`);

  if (failedTests > 0) {
    console.log('\n\n⚠️  FAILED TESTS:\n');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`   • ${r.locale.toUpperCase()} - ${r.page}`);
      console.log(`     ${r.url}`);
      if (r.error) console.log(`     Error: ${r.error}`);
    });
  }

  console.log('\n' + '─'.repeat(64) + '\n');
  
  if (passedTests === totalTests) {
    console.log('🎉 All translation tests passed! Both English and Kannada work perfectly.\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Please review the output above.\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('\n❌ Test runner error:', error);
  process.exit(1);
});
