const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const testGeminiConnection = async () => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ GEMINI_API_KEY not found in environment variables');
      return false;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent('Hello, respond with "Gemini API is working!"');
    const response = await result.response;
    const text = response.text();

    console.log('✅ Gemini API Response:', text);
    return true;
  } catch (error) {
    console.log('❌ Gemini API Error:', error.message);
    return false;
  }
};

// Run test if called directly
if (require.main === module) {
  testGeminiConnection();
}

module.exports = { testGeminiConnection };