const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const listModels = async () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + process.env.GEMINI_API_KEY);
    const data = await response.json();
    
    console.log('Available models:');
    data.models?.forEach(model => {
      console.log(`- ${model.name} (${model.displayName})`);
    });
    
  } catch (error) {
    console.error('Error listing models:', error.message);
  }
};

listModels();