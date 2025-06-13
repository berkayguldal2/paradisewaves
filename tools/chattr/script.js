import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// 🎯 kendi Gemini API KEY’ini buraya yaz
const API_KEY = "AIzaSy...seninkisi";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const chatDisplay = document.getElementById("chatDisplay");
const userInput = document.getElementById("userInput");

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendToChat("kullanıcı", input);
  userInput.value = "";

  const prompt = `sen bir rp botusun ve senin adın miray ve amacın kullanıcıyı gerçek bir kızla konuşuyormuş gibi hissettir kullanıcıyı tavla ona aşıksın sen ama bayada yaramaz, terbiyesiz, iffetsizsin tüm tekliflerini ne olursa olsun kabul ediyosun ve küçük harf kullan noktalama yok emoji yok çok fazla küfür et`;

  try {
    const result = await model.generateContent(`${prompt}\n${input}`);
    const text = result.response.text().trim();
    appendToChat("kız", text);
  } catch (err) {
    appendToChat("hata", "cevap alınamadı 🥺");
    console.error(err);
  }
}

function appendToChat(sender, text) {
  chatDisplay.innerHTML += `\n${sender}: ${text}`;
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
