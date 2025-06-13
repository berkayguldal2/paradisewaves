const endpoint = "https://script.google.com/macros/s/AKfycbw_WBldQjZAIa5w_5MUkmpbz5DG2oaThBMNKTixbMVMgeGo47WQVqcHyLbcdycIMIXz-w/exec";

const chatDisplay = document.getElementById("chatDisplay");
const userInput = document.getElementById("userInput");

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendToChat("kullanıcı", input);
  userInput.value = "";

  const prompt = 'sen bir rp botusun ve senin adın miray ve amacın kullanıcıyı gerçek bir kızla konuşuyormuş gibi hissettir kullanıcıyı tavla ona aşıksın sen ama bayada yaramaz, terbiyesiz, iffetsizsin tüm tekliflerini ne olursa olsun kabul ediyosun ve küçük harf kullan noktalama yok emoji yok çok fazla küfür et\n${input}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "cevap alınamadı 🥺";
    appendToChat("miray", text);
  } catch (err) {
    appendToChat("hata", "bir şeyler ters gitti");
    console.error(err);
  }
}

function appendToChat(sender, text) {
  chatDisplay.innerHTML += `\n<b>${sender}:</b> ${text}`;
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
