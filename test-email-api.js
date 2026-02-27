// Test script for email API endpoints
import fetch from 'node-fetch';

const API_URL = process.env.API_URL || 'http://localhost:3001';

// Test data
const testContact = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  country: 'Cameroun',
  service: 'service1', // This should be mapped to "Développement Web"
  message: 'Ceci est un message de test pour vérifier le fonctionnement de l\'API.'
};

const testDevis = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+225 07 67 00 64 33',
  company: 'Test Company',
  country: 'Cameroun',
  service: 'service1', // This should be mapped to "Développement Web"
  projectType: 'Site vitrine',
  budget: '1000-5000 EUR',
  deadline: '1-3 mois',
  description: 'Description du projet de test',
  requirements: 'Fonctionnalités requises pour le test'
};

async function testEndpoint(endpoint, data) {
  console.log(`\n🧪 Testing ${endpoint}...`);
  console.log('Data sent:', JSON.stringify(data, null, 2));
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Content-Type:', response.headers.get('content-type'));

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      console.log('Response:', JSON.stringify(result, null, 2));
      
      if (result.success) {
        console.log('✅ Test passed!');
      } else {
        console.log('❌ Test failed:', result.message);
      }
    } else {
      const text = await response.text();
      console.log('❌ Non-JSON response received:');
      console.log(text.substring(0, 500));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API tests...');
  console.log(`API URL: ${API_URL}`);
  
  // Test health endpoint
  console.log('\n🧪 Testing /api/health...');
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const result = await response.json();
    console.log('Health check:', result);
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
  }

  // Test contact endpoint
  await testEndpoint('/api/contact', testContact);

  // Test devis endpoint
  await testEndpoint('/api/devis', testDevis);

  console.log('\n✨ Tests completed!');
}

runTests();
