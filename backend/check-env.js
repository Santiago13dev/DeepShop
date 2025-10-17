const fs = require('fs');
const path = require('path');

/**
 * Script para verificar variables de entorno requeridas
 */

console.log('\n🔍 Verificando configuración de variables de entorno...\n');

// Cargar archivo .env
require('dotenv').config();

// Variables requeridas
const requiredVars = [
  'FRONTEND_URL',
  'BACKEND_URL',
  'DATABASE_URL',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'STRIPE_PUBLIC_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'EMAIL_FROM',
  'JWT_SECRET',
];

// Verificar cada variable
let allConfigured = true;
const missing = [];
const configured = [];
const needsRealValue = [];

requiredVars.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    missing.push(varName);
    allConfigured = false;
    console.log(`❌ ${varName}: NO CONFIGURADA`);
  } else if (
    value.includes('tu-') || 
    value.includes('tu_') ||
    value.includes('123456') ||
    value === 'pk_test_51QGihYP4mZQunQMR0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' ||
    value === 'sk_test_51QGihYP4mZQunQMR0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  ) {
    needsRealValue.push(varName);
    allConfigured = false;
    console.log(`⚠️  ${varName}: VALOR DE EJEMPLO (necesita valor real)`);
  } else {
    configured.push(varName);
    console.log(`✅ ${varName}: Configurada`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('\n📊 RESUMEN:\n');
console.log(`✅ Variables configuradas: ${configured.length}/${requiredVars.length}`);

if (missing.length > 0) {
  console.log(`❌ Variables faltantes: ${missing.length}`);
  console.log('   → ' + missing.join(', '));
}

if (needsRealValue.length > 0) {
  console.log(`⚠️  Variables con valores de ejemplo: ${needsRealValue.length}`);
  console.log('   → ' + needsRealValue.join(', '));
}

console.log('\n' + '='.repeat(60));

if (allConfigured) {
  console.log('\n🎉 ¡Todas las variables están configuradas correctamente!\n');
  console.log('Puedes iniciar el servidor con: npm run start:dev\n');
} else {
  console.log('\n⚠️  Acción requerida:\n');
  
  if (missing.length > 0 || needsRealValue.length > 0) {
    console.log('1. Obtén tus claves de Stripe en:');
    console.log('   https://dashboard.stripe.com/test/apikeys\n');
    
    console.log('2. Obtén tu API Key de SendGrid en:');
    console.log('   https://app.sendgrid.com/settings/api_keys\n');
    
    console.log('3. Actualiza el archivo .env con los valores reales\n');
    
    console.log('4. Lee la guía completa en:');
    console.log('   CONFIGURACION_ENV.md\n');
  }
}

process.exit(allConfigured ? 0 : 1);
