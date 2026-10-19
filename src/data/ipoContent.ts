import { HardwareItem, ScenarioCase, QuizQuestion } from '../types/ipo';

export const HARDWARE_CATALOG: HardwareItem[] = [
  // INPUT DEVICES
  {
    id: 'hw-keyboard',
    name: 'Keyboard (Papan Ketik)',
    category: 'input',
    categoryLabel: 'Input (Masukan)',
    iconName: 'Keyboard',
    role: 'Memasukkan karakter teks, angka, simbol, dan instruksi tombol pintas ke komputer.',
    description: 'Saat tombol ditekan, sirkuit mendeteksi sakelar dan mengirimkan kode biner (ASCII/Unicode) ke sistem.',
    analogOrDigital: 'Fisik Tekanan → Kode Digital Biner',
    examples: ['Keyboard mekanik', 'Virtual keyboard di HP', 'Keyboard nirkabel']
  },
  {
    id: 'hw-mouse',
    name: 'Mouse / Touchpad',
    category: 'input',
    categoryLabel: 'Input (Masukan)',
    iconName: 'Mouse',
    role: 'Memasukkan koordinat posisi kursor (X, Y) dan sinyal klik ke komputer.',
    description: 'Sensor optik/laser di bawah mouse memotret permukaan ribuan kali per detik untuk menghitung arah geseran.',
    analogOrDigital: 'Gerakan Fisik Tangan → Koordinat Digital',
    examples: ['Optical mouse', 'Touchpad laptop', 'Trackball']
  },
  {
    id: 'hw-camera',
    name: 'Kamera / Webcam / Sensor Foto',
    category: 'input',
    categoryLabel: 'Input (Masukan)',
    iconName: 'Camera',
    role: 'Menangkap cahaya gambar dan video dari dunia nyata menjadi data piksel warna.',
    description: 'Sensor CMOS mengubah foton cahaya menjadi sinyal listrik, lalu diubah menjadi matriks bit warna RGB.',
    analogOrDigital: 'Cahaya Nyata → Data Citra Digital (Piksel)',
    examples: ['Kamera HP', 'Webcam rapat online', 'Kamera CCTV']
  },
  {
    id: 'hw-mic',
    name: 'Mikrofon (Microphone)',
    category: 'input',
    categoryLabel: 'Input (Masukan)',
    iconName: 'Mic',
    role: 'Menangkap getaran gelombang suara manusia atau instrumen musik.',
    description: 'Diafragma bergetar mengikuti suara dan menghasilkan arus listrik yang diubah oleh ADC menjadi audio digital.',
    analogOrDigital: 'Gelombang Suara Akustik → Data Audio Digital',
    examples: ['Mic headset', 'Voice note mic di smartphone', 'Studio condenser mic']
  },
  {
    id: 'hw-scanner',
    name: 'Scanner / Pemindai Dokumen & Barcode',
    category: 'input',
    categoryLabel: 'Input (Masukan)',
    iconName: 'ScanLine',
    role: 'Membaca lembar fisik atau barcode menjadi berkas gambar/angka di komputer.',
    description: 'Sinar sensor membaca kontras garis hitam-putih atau warna kertas secara berbaris.',
    analogOrDigital: 'Kertas Fisik → Berkas Digital PDF/JPG',
    examples: ['Scanner flatbed', 'Barcode scanner kasir minimarket', 'QR code reader']
  },
  {
    id: 'hw-gamepad',
    name: 'Gamepad / Joystick Game',
    category: 'input',
    categoryLabel: 'Input (Masukan)',
    iconName: 'Gamepad2',
    role: 'Memasukkan arah gerakan joystick analog dan tombol aksi pemain dalam permainan.',
    description: 'Potensiometer membaca sudut kemiringan tuas analog menjadi nilai persentase gerak karakter.',
    analogOrDigital: 'Dorongan Jari → Kecepatan & Sudut Gerak Digital',
    examples: ['Stick PS/Xbox', 'Nintendo Joy-Con', 'Setir kemudi simulator']
  },

  // PROCESS DEVICES
  {
    id: 'hw-cpu',
    name: 'CPU (Central Processing Unit)',
    category: 'process',
    categoryLabel: 'Proses (Pengolahan)',
    iconName: 'Cpu',
    role: 'Otak utama komputer yang mengeksekusi instruksi program, hitungan matematika, dan logika.',
    description: 'Terdiri dari ALU (Arithmetic Logic Unit) untuk berhitung dan CU (Control Unit) untuk mengatur jalannya data.',
    analogOrDigital: 'Mengolah miliaran instruksi siklus fetch-decode-execute per detik',
    examples: ['Intel Core i5/i7', 'AMD Ryzen', 'Apple M-Series / Snapdragon HP']
  },
  {
    id: 'hw-ram',
    name: 'RAM (Random Access Memory)',
    category: 'process',
    categoryLabel: 'Proses (Penyimpanan Sementara)',
    iconName: 'CircuitBoard',
    role: 'Menampung data dan aplikasi yang sedang aktif diproses oleh CPU secara kilat.',
    description: 'Bersifat volatil (data hilang jika listrik mati). Berfungsi sebagai meja kerja cepat bagi prosesor.',
    analogOrDigital: 'Kecepatan transfer data gigabyte per detik',
    examples: ['DDR4 / DDR5 RAM', 'LPDDR di ponsel pintar']
  },
  {
    id: 'hw-gpu',
    name: 'GPU (Graphics Processing Unit)',
    category: 'process',
    categoryLabel: 'Proses (Grafis)',
    iconName: 'MonitorPlay',
    role: 'Memproses perhitungan matematika grafis 3D, rendering visual, dan efek filter foto/video.',
    description: 'Memiliki ribuan inti kecil untuk memproses jutaan piksel secara paralel dalam waktu bersamaan.',
    analogOrDigital: 'Render Poligon 3D → Raster Matriks Piksel',
    examples: ['NVIDIA GeForce', 'AMD Radeon', 'GPU terintegrasi di SoC ponsel']
  },

  // STORAGE DEVICES
  {
    id: 'hw-ssd',
    name: 'SSD (Solid State Drive) / Flash Storage',
    category: 'storage',
    categoryLabel: 'Storage (Penyimpanan Sekunder)',
    iconName: 'HardDrive',
    role: 'Menyimpan sistem operasi, file dokumen, game, dan foto secara permanen non-volatil.',
    description: 'Menggunakan chip memori flash tanpa bagian mekanik berputar, sehingga tahan guncangan dan sangat cepat.',
    analogOrDigital: 'Simpan Permanen Elektronik',
    examples: ['NVMe M.2 SSD', 'Memori internal smartphone (UFS)', 'SATA SSD']
  },
  {
    id: 'hw-flashdisk',
    name: 'Flashdisk USB / Kartu MicroSD',
    category: 'storage',
    categoryLabel: 'Storage (Penyimpanan Portabel)',
    iconName: 'Save',
    role: 'Media penyimpanan data portabel yang mudah dipindah-pindah antar perangkat.',
    description: 'Menyimpan berkas tugas, video, atau backup dokumen di saku baju.',
    analogOrDigital: 'Simpan Permanen Portabel',
    examples: ['USB Flash drive 32GB', 'MicroSD kamera', 'External HDD']
  },

  // OUTPUT DEVICES
  {
    id: 'hw-monitor',
    name: 'Layar Monitor / Display Layar',
    category: 'output',
    categoryLabel: 'Output (Keluaran Visual)',
    iconName: 'Monitor',
    role: 'Menampilkan antarmuka grafis, teks, gambar, dan video yang dihasilkan sistem.',
    description: 'Menerima sinyal video dari kartu grafis lalu menyalakan ribuan lampu sub-piksel (Merah, Hijau, Biru) di panel.',
    analogOrDigital: 'Data Biner Framebuffer → Tampilan Visual Terlihat Mata',
    examples: ['Monitor IPS PC', 'Layar AMOLED HP', 'Layar Laptop']
  },
  {
    id: 'hw-printer',
    name: 'Printer (Pencetak Kertas)',
    category: 'output',
    categoryLabel: 'Output (Keluaran Fisik)',
    iconName: 'Printer',
    role: 'Mencetak berkas tulisan atau foto digital dari komputer ke lembaran kertas fisik (*hardcopy*).',
    description: 'Menyemprotkan titik tinta mikroskopis (inkjet) atau membakar serbuk toner dengan panas laser ke atas kertas.',
    analogOrDigital: 'Data Berkas Digital → Dokumen Cetak Nyata',
    examples: ['Printer Inkjet warna', 'Laser printer cepat', 'Printer kasir nota']
  },
  {
    id: 'hw-speaker',
    name: 'Speaker / Earphone / Headset',
    category: 'output',
    categoryLabel: 'Output (Keluaran Audio)',
    iconName: 'Volume2',
    role: 'Mengubah sinyal data audio digital menjadi gelombang suara yang terdengar oleh telinga manusia.',
    description: 'Arus listrik menggerakkan membran magnetik di corong speaker maju-mundur untuk menggetarkan udara sekitar.',
    analogOrDigital: 'Bit Audio Digital → Getaran Suara Akustik',
    examples: ['Speaker komputer stereo', 'Earphone TWS Bluetooth', 'Headphone gaming']
  },
  {
    id: 'hw-projector',
    name: 'Proyektor LCD',
    category: 'output',
    categoryLabel: 'Output (Keluaran Proyeksi)',
    iconName: 'Tv',
    role: 'Memproyeksikan tampilan layar komputer dengan ukuran besar ke dinding atau papan tulis kelas.',
    description: 'Membesarkan berkas cahaya melalui lensa optik agar materi presentasi dapat dilihat bersama satu kelas.',
    analogOrDigital: 'Sinyal Digital HDMI → Gambar Sorot Cahaya Besar',
    examples: ['Proyektor ruang kelas', 'Proyektor bioskop mini']
  }
];

export const SCENARIO_CASES: ScenarioCase[] = [
  {
    id: 'case-typing-doc',
    title: 'Kasus 1: Mengetik & Mencetak Tugas Sekolah',
    subtitle: 'Makalah Informatika Kelas 7',
    icon: 'FileText',
    story: 'Rani sedang mengetik makalah tugas Informatika tentang "Perangkat Keras" di aplikasi pengolah kata. Setelah selesai, Rani mengecek ketikannya lalu mencetak lembar tugas ke kertas untuk dikumpulkan ke guru besok pagi.',
    realLifeContext: 'Aktivitas pembuatan laporan dan pencetakan dokumen fisik di perpustakaan atau lab komputer sekolah.',
    availableItems: [
      HARDWARE_CATALOG.find(h => h.id === 'hw-keyboard')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-cpu')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-ram')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-monitor')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-printer')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-ssd')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-mouse')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-speaker')!
    ],
    expectedSolution: {
      input: ['hw-keyboard', 'hw-mouse'],
      process: ['hw-cpu', 'hw-ram'],
      storage: ['hw-ssd'],
      output: ['hw-monitor', 'hw-printer']
    },
    stepExplainer: {
      input: 'Jari Rani menekan tombol huruf di Keyboard dan mengklik Mouse untuk memilih menu.',
      process: 'CPU menerjemahkan kode ketikan tombol menjadi karakter huruf, lalu RAM menampung kalimat naskah yang sedang dibuka.',
      storage: 'Saat Rani menekan "Simpan / Save", file naskah tersimpan aman di dalam SSD agar tidak hilang.',
      output: 'Layar Monitor menampilkan naskah secara visual di depan mata Rani, dan Printer mencetak dokumen fisik ke atas kertas!'
    }
  },
  {
    id: 'case-photo-filter',
    title: 'Kasus 2: Memotret & Edit Filter di Smartphone',
    subtitle: 'Foto Eksperimen Lab IPA',
    icon: 'Camera',
    story: 'Budi menggunakan smartphone untuk mengambil foto tanaman kacang hijau hasil praktikum IPA. Sebelum diunggah ke media sosial kelas, Budi memberi filter kecerahan dan kontras agar tampak lebih tajam, lalu foto tersimpan di galeri HP.',
    realLifeContext: 'Memotret objek, pengolahan citra digital di chip ponsel, dan melihat hasilnya di layar sentuh OLED.',
    availableItems: [
      HARDWARE_CATALOG.find(h => h.id === 'hw-camera')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-cpu')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-gpu')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-monitor')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-ssd')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-mic')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-printer')!
    ],
    expectedSolution: {
      input: ['hw-camera'],
      process: ['hw-cpu', 'hw-gpu'],
      storage: ['hw-ssd'],
      output: ['hw-monitor']
    },
    stepExplainer: {
      input: 'Sensor Kamera menangkap pantulan cahaya dari tanaman kacang hijau dan mengubahnya menjadi sinyal digital piksel.',
      process: 'Chip Prosesor (CPU & GPU) menghitung rumus matematis filter warna, saturasi, dan ketajaman setiap piksel foto.',
      storage: 'File foto JPEG/PNG disimpan ke dalam Memori Internal Flash (Storage ponsel) di folder Galeri.',
      output: 'Layar HP (Monitor Layar Sentuh) menampilkan pratinjau foto yang jernih dan cerah untuk dilihat oleh Budi.'
    }
  },
  {
    id: 'case-music-stream',
    title: 'Kasus 3: Memutar Lagu Musik Streaming',
    subtitle: 'Mendengarkan Lagu Kebangsaan / Pop',
    icon: 'Headphones',
    story: 'Siti ingin mendengarkan lagu Indonesia Raya untuk latihan upacara bendera. Ia membuka aplikasi pemutar lagu, menekan tombol "Putar (Play)" dan mengatur volume suara, kemudian musik mengalun jernih melalui headphone yang dipakainya.',
    realLifeContext: 'Interaksi memilih lagu, dekode kompresi audio MP3 oleh CPU, dan getaran suara di telinga.',
    availableItems: [
      HARDWARE_CATALOG.find(h => h.id === 'hw-mouse')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-cpu')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-ram')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-speaker')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-ssd')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-keyboard')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-scanner')!
    ],
    expectedSolution: {
      input: ['hw-mouse', 'hw-keyboard'],
      process: ['hw-cpu', 'hw-ram'],
      storage: ['hw-ssd'],
      output: ['hw-speaker']
    },
    stepExplainer: {
      input: 'Siti mengklik tombol Play menggunakan Mouse atau sentuhan jari di layar.',
      process: 'CPU dan sirkuit Audio mendekode file lagu terkompresi (MP3/AAC) menjadi sampel audio digital secara berurutan.',
      storage: 'Berkas lagu diambil dari penyimpanan memori (Storage/Cache perangkat).',
      output: 'Headphone atau Speaker mengubah arus listrik audio menjadi gelombang suara getaran yang terdengar merdu di telinga.'
    }
  },
  {
    id: 'case-game-controller',
    title: 'Kasus 4: Bermain Game Petualangan Robot',
    subtitle: 'Mengendalikan Karakter & Mengalahkan Rintangan',
    icon: 'Gamepad2',
    story: 'Doni sedang asyik bermain game petualangan. Saat ia menggeser tuas stick gamepad ke arah kanan, karakter robot di dalam game seketika melompat melewati jurang dan speaker game membunyikan efek koin emas.',
    realLifeContext: 'Game real-time dengan latensi rendah: input tombol refleks, pemrosesan logika fisika dunia game, dan output visual dinamis.',
    availableItems: [
      HARDWARE_CATALOG.find(h => h.id === 'hw-gamepad')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-cpu')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-gpu')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-monitor')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-speaker')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-ssd')!,
      HARDWARE_CATALOG.find(h => h.id === 'hw-mic')!
    ],
    expectedSolution: {
      input: ['hw-gamepad'],
      process: ['hw-cpu', 'hw-gpu'],
      storage: ['hw-ssd'],
      output: ['hw-monitor', 'hw-speaker']
    },
    stepExplainer: {
      input: 'Doni menggeser analog joystick Gamepad dan memencet tombol lompat.',
      process: 'CPU menghitung hukum fisika gravitasi lompatan karakter, sementara GPU me-render gambar animasi 60 frame per detik.',
      storage: 'Skor tertinggi dan checkpoint permainan disimpan ke dalam SSD Game.',
      output: 'Layar Monitor menampilkan gerakan mulus karakter robot melompat dan Speaker menyuarakan denting koin emas!'
    }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Jika kamu mengibaratkan komputer seperti mesin pembuat jus buah (blender), komponen apakah yang sepadan dengan "Buah Segar" yang dimasukkan ke dalam wadah?',
    options: [
      'Data atau instruksi masukan melalui perangkat Input (seperti ketikan keyboard)',
      'Listrik yang mengalir di kabel daya',
      'Jus buah manis yang siap diminum di gelas',
      'Pisau blender yang berputar menghancurkan buah'
    ],
    correctIndex: 0,
    explanation: 'Buah segar adalah bahan mentah masukan. Pada komputer, bahan mentah ini adalah data atau instruksi yang dimasukkan pengguna lewat perangkat Input (misal: teks keyboard, klik mouse, atau foto kamera).',
    categoryTarget: 'input'
  },
  {
    id: 2,
    question: 'Manakah di bawah ini pasangan perangkat komputer yang KEDUANYA termasuk ke dalam kategori perangkat OUTPUT (Keluaran)?',
    options: [
      'Keyboard dan Mouse',
      'Layar Monitor dan Mesin Printer',
      'Webcam dan Mikrofon',
      'CPU Processor dan RAM'
    ],
    correctIndex: 1,
    explanation: 'Layar Monitor (menampilkan gambar/teks untuk mata) dan Printer (mencetak hasil fisik ke kertas) keduanya bertugas menyajikan data hasil olahan ke pengguna, sehingga merupakan Output!',
    categoryTarget: 'output'
  },
  {
    id: 3,
    question: 'Seorang siswa menempatkan "Printer" pada kolom perangkat INPUT pada tugas simulator komputasi. Mengapa jawaban tersebut TIDAK TEPAT menurut konsep IPO?',
    options: [
      'Karena Printer tidak menggunakan kabel USB',
      'Karena Printer hanya berfungsi saat komputer dimatikan',
      'Karena Printer bertugas mengeluarkan hasil cetak dari komputer, bukan memasukkan instruksi data baru',
      'Karena Printer memiliki ukuran yang lebih besar dari CPU'
    ],
    correctIndex: 2,
    explanation: 'Input bertugas memasukkan data ke komputer. Printer justru menerima instruksi dari komputer untuk mencetak naskah keluar ke atas kertas fisik (Output).',
    categoryTarget: 'output'
  },
  {
    id: 4,
    question: 'Komponen perangkat keras yang sering dijuluki sebagai "Otak Komputer" karena bertugas melakukan perhitungan matematika (ALU) dan mengendalikan alur kerja data adalah...',
    options: [
      'Harddisk / SSD Storage',
      'CPU (Central Processing Unit)',
      'Layar Monitor LED',
      'Power Supply Listrik'
    ],
    correctIndex: 1,
    explanation: 'CPU (Central Processing Unit) adalah inti pemroses (tahap Proses) yang mengeksekusi instruksi program, perhitungan aritmatika, serta logika komputasi.',
    categoryTarget: 'process'
  },
  {
    id: 5,
    question: 'Apa perbedaan utama antara memori RAM (tahap Proses) dengan penyimpanan SSD/Harddisk (Storage Sekunder)?',
    options: [
      'RAM menyimpan data secara permanen saat listrik mati, sedangkan SSD datanya langsung terhapus',
      'RAM bertugas menyimpan data sementara yang sedang aktif diolah CPU, sedangkan SSD menyimpan file secara permanen walaupun komputer dimatikan',
      'RAM hanya dipakai untuk menyalakan lampu kipas pendingin',
      'SSD diletakkan di luar casing, sedangkan RAM selalu di dalam mouse'
    ],
    correctIndex: 1,
    explanation: 'RAM bersifat volatile (sementara, super cepat untuk meja kerja CPU), sedangkan Storage SSD/HDD bersifat non-volatile (permanen untuk arsip berkas naskah, foto, dan sistem operasi).',
    categoryTarget: 'storage'
  },
  {
    id: 6,
    question: 'Ketika kamu melakukan panggilan video (video call) dengan teman melalui aplikasi Zoom atau WhatsApp, perangkat apa yang bertugas sebagai INPUT untuk menangkap wajah dan suaramu?',
    options: [
      'Kamera/Webcam dan Mikrofon',
      'Layar LCD dan Speaker',
      'Proyektor dan Headset',
      'Printer dan Flashdisk'
    ],
    correctIndex: 0,
    explanation: 'Webcam menangkap sinyal optik cahaya wajahmu dan Mikrofon menangkap getaran suara bicaramu untuk diubah menjadi data digital (Input). Layar dan speaker temanmu adalah Output yang menerimanya.',
    categoryTarget: 'input'
  },
  {
    id: 7,
    question: 'Perhatikan alur berikut: [Ketukan Jari pada Layar Sentuh] ➔ [Prosesor Ponsel Mengkalkulasi] ➔ [Karakter Muncul di Aplikasi Chat]. Urutan siklus yang benar secara berturut-turut adalah...',
    options: [
      'Proses ➔ Output ➔ Input',
      'Input ➔ Proses ➔ Output',
      'Output ➔ Input ➔ Proses',
      'Storage ➔ Output ➔ Input'
    ],
    correctIndex: 1,
    explanation: 'Ketukan jari = INPUT (Masukan); Kalkulasi oleh prosesor = PROSES (Pengolahan); Karakter teks muncul di layar = OUTPUT (Keluaran). Inilah siklus dasar kerja komputer!',
    categoryTarget: 'general'
  },
  {
    id: 8,
    question: 'Dalam game balap mobil, pemain memutar setir simulator (gamepad). Mengapa game tersebut dapat memberikan getaran sentuhan (*force feedback/haptic*) ke tangan pemain saat menabrak pembatas jalan?',
    options: [
      'Karena stick game mengalami korsleting arus pendek',
      'Karena motor getar di dalam stick bertindak sebagai perangkat Output fisik yang memberi umpan balik sensasi tabrakan',
      'Karena getaran tersebut berasal dari speaker komputer yang berbunyi sangat keras',
      'Karena setir simulator adalah perangkat khusus penyimpanan data'
    ],
    correctIndex: 1,
    explanation: 'Motor getar (haptic feedback) adalah aktuator keluaran (Output) yang mengubah sinyal digital tabrakan dari komputer menjadi sensasi getaran nyata pada telapak tangan pemain.',
    categoryTarget: 'output'
  }
];

export const CURRICULUM_INFO = {
  subject: 'Informatika',
  grade: 'Kelas VII (Tujuh) SMP / Fase D',
  element: 'Sistem Komputer (SK)',
  subTopic: 'Mekanisme Kerja Komputer & Siklus Input - Proses - Storage - Output (IPSO)',
  learningObjective: 'Peserta didik mampu menganalisis alur pemrosesan data pada komputer berdasarkan siklus Input-Proses-Output (IPO) melalui simulasi interaktif secara kolaboratif.',
  pancasilaProfile: [
    { title: 'Bernalar Kritis', desc: 'Mampu menganalisis alur data serta membedakan fungsi komponen masukan, pengolah, penyimpan, dan keluaran.' },
    { title: 'Mandiri', desc: 'Mampu mencoba simulasi, memecahkan tantangan studi kasus, dan berefleksi secara sadar atas pemahaman diri.' },
    { title: 'Gotong Royong', desc: 'Bekerja sama secara berpasangan (*peer-work*) dalam mendiskusikan studi kasus nyata teknologi komputer.' }
  ],
  assessmentIndicator: [
    'Mengidentifikasi analogi pemrosesan data sederhana (mesin blender) dengan sistem komputer.',
    'Menentukan perangkat yang termasuk dalam kategori Input, Proses, Storage, dan Output.',
    'Menganalisis studi kasus nyata (mengetik & cetak, memotret, memutar musik, bermain game).',
    'Menjelaskan alasan logis mengapa suatu perangkat tidak dapat ditukar posisinya dalam siklus IPO.'
  ]
};
