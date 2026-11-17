// JavaScript portofolio Indra Yudhistira
// Dipasang di semua halaman dengan defer

// 1. Daftar keahlian (halaman Beranda)
const skills = [
  { nama: "HTML5 Semantic", level: "Menengah" },
  { nama: "CSS3 Flexbox", level: "Menengah" },
  { nama: "Responsive Design", level: "Menengah" },
  { nama: "Media Queries", level: "Dasar" },
  { nama: "Chrome DevTools", level: "Dasar" },
  { nama: "C++ untuk IoT", level: "Dasar" },
  { nama: "Git dan GitHub", level: "Dasar" },
];
skills.push({ nama: "JavaScript", level: "Dasar" });

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

if (daftarSkill && jumlahSkill) {
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nama} (${skill.level})`;
    item.className = "skill-badge";
    daftarSkill.appendChild(item);
  });
  jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
}

// 2. Tema gelap (semua halaman, pilihan tersimpan di localStorage)
const tombolTema = document.querySelector("#tombol-tema");
const kunciTema = "tema";

function terapkanTema(modeGelap) {
  document.body.classList.toggle("gelap", modeGelap);
  if (!tombolTema) return;
  tombolTema.textContent = modeGelap ? "Mode Terang" : "Mode Gelap";
  tombolTema.setAttribute("aria-pressed", modeGelap ? "true" : "false");
}

let temaTersimpan = null;
try {
  temaTersimpan = localStorage.getItem(kunciTema);
} catch (error) {
  // localStorage bisa diblokir; tema tetap memakai nilai bawaan.
}
terapkanTema(temaTersimpan === "gelap");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    const modeGelap = !document.body.classList.contains("gelap");
    terapkanTema(modeGelap);
    try {
      localStorage.setItem(kunciTema, modeGelap ? "gelap" : "terang");
    } catch (error) {
      // Abaikan bila penyimpanan tidak tersedia.
    }
  });
}

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  const batasKarakter = kotakPesan.maxLength || 300;
  hitungKarakter.textContent = `0/${batasKarakter} karakter`;
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/${batasKarakter} karakter`;
  });
}

// 4. Modal kirim pesan (halaman Beranda)
const btnBukaModal = document.querySelector("#btnKontak");
const elemenModal = document.querySelector("#modalkontak");
const btnTutupModal = document.querySelector("#btnTutupModal");

if (btnBukaModal && elemenModal && btnTutupModal) {
  btnBukaModal.addEventListener("click", (event) => {
    event.preventDefault();
    elemenModal.classList.add("show");
  });
  btnTutupModal.addEventListener("click", () => {
    elemenModal.classList.remove("show");
  });
  elemenModal.addEventListener("click", (event) => {
    if (event.target === elemenModal) elemenModal.classList.remove("show");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") elemenModal.classList.remove("show");
  });
}

// 5. Form kontak: hanya demo, tidak mengirim ke server
const formKontak = document.querySelector("#formKontak");
const statusKontak = document.querySelector("#status-kontak");

if (formKontak && statusKontak) {
  formKontak.addEventListener("submit", (event) => {
    event.preventDefault();
    statusKontak.textContent = "Pesan tercatat. Terima kasih sudah menghubungi saya!";
  });
}

// 6. Daftar proyek dan filter (halaman Proyek)
const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/proyek-profil.png",
    alt: "Tangkapan layar halaman profil pertama",
    deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar.",
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/proyek-kontak.png",
    alt: "Tangkapan layar form kontak",
    deskripsi: "Form dengan label dan validasi bawaan browser.",
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/proyek-jadwal.png",
    alt: "Tangkapan layar tabel jadwal belajar",
    deskripsi: "Jadwal belajar mingguan dengan thead dan tbody.",
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "img/proyek-responsif.png",
    alt: "Tangkapan layar portofolio responsif",
    deskripsi: "Rapi di ponsel, tablet, dan laptop dengan Flexbox.",
  },
  {
    judul: "Kalkulator Nilai Rapor",
    kategori: "JavaScript",
    gambar: "img/proyek-kalkulator.png",
    alt: "Tangkapan layar hasil kalkulator nilai",
    deskripsi: "Rata-rata, predikat, dan status KKM dengan fungsi JavaScript.",
  },
  {
    judul: "Lima Soal Logika",
    kategori: "JavaScript",
    gambar: "img/proyek-logika.png",
    alt: "Tangkapan layar hasil uji lima soal logika",
    deskripsi: "Lima fungsi logika yang masing-masing diuji tiga masukan.",
  },
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
      <p>${item.deskripsi}</p>
    </article>`;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek || !jumlahProyek) return;
  const semuaKartu = daftar.map((item) => buatKartu(item));
  daftarProyek.innerHTML = semuaKartu.join("");
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);
  if (!tombol) return;
  tombol.addEventListener("click", () => {
    const tombolAktif = document.querySelector(".tombol-filter.aktif");
    if (tombolAktif) tombolAktif.classList.remove("aktif");
    tombol.classList.add("aktif");

    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
    }
  });
}

if (daftarProyek && jumlahProyek) {
  tampilkanProyek(proyek);
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}
