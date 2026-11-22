# Barış Değirmenci - Portfolio Website

> 🔄 **Bu proje, eski bobothemomo.github.io içeriği kullanılarak yeni Bedimcode template yapısıyla yeniden oluşturulmuştur**  
> 📅 **Tarih:** 2025-11-09  
> 🎨 **Template:** Responsive Portfolio Website (Bedimcode inspired)

---

## 📋 Proje Hakkında

Bu modern, responsive portföy web sitesi, Barış Değirmenci'nin yeteneklerini, projelerini ve deneyimlerini sergileyen kapsamlı bir platformdur. 

### ✨ Özellikler

- ✅ **Tamamen Responsive** - Tüm cihazlarda mükemmel görünüm
- 🌙 **Dark Mode** - Göz dostu karanlık tema desteği
- 🎯 **Modern Tasarım** - Temiz ve profesyonel arayüz
- 📱 **Mobile First** - Önce mobil cihazlar için optimize edilmiş
- 🎨 **Swiper Integration** - Akıcı portfolio slider'ı
- 📧 **Formspree Entegrasyonu** - Çalışan iletişim formu
- ⚡ **Hızlı Yükleme** - Optimize edilmiş performans

---

## 📂 Proje Yapısı

```
bobothemomo.github.io/
│
├── index.html                 # Ana sayfa (YENİ TASARIM)
├── uxui-mobile-app.html       # UX/UI Mobile App detay sayfası
├── mobile-app-mockup.html     # Mobile app mockup sayfası
├── README.md                  # Bu dosya
│
├── assets/                    # YENİ YAPILANDIRILMIŞ ASSETS
│   ├── css/
│   │   ├── styles.css         # Ana CSS dosyası (YENİ)
│   │   └── swiper-bundle.min.css
│   │
│   ├── js/
│   │   ├── main.js            # Ana JavaScript dosyası (YENİ)
│   │   └── swiper-bundle.min.js
│   │
│   ├── img/                   # Tüm görseller (ESKİ PROJEDEN)
│   │   ├── mountain-camera.jpg
│   │   ├── paris-image.jpg
│   │   ├── sketch-*.jpg
│   │   ├── community-*.png/jpg
│   │   ├── schoolwork-*.png/jpg
│   │   └── UI/               # UX/UI Mobile App görselleri
│   │
│   └── pdf/                   # Tüm PDF dosyaları (ESKİ PROJEDEN)
│       ├── Baris_Degirmenci_CV.pdf
│       ├── AGP_Katalog_19_03_2024.pdf
│       ├── Vitaself_BASKI.pdf
│       ├── *_ScreenWriting.pdf
│       └── Reports/
│           └── *.pdf          # Faaliyet raporları
│
├── css/                       # ESKİ CSS dosyaları (uxui-mobile-app için)
│   ├── bootstrap.css
│   ├── bootstrap.min.css
│   ├── style.css
│   ├── dark-mode.css
│   └── bootstrap-callout.css
│
├── js/                        # ESKİ JavaScript dosyaları
│   ├── bootstrap.bundle.min.js
│   └── main.js
│
└── image/                     # ESKİ image klasörü (backup amaçlı)
    └── ...

```

---

## 🎯 İçerik Kaynak Eşlemesi

### 📌 ESKİ PROJEDEN AKTARILAN İÇERİKLER:

#### 👤 Kişisel Bilgiler
- **İsim:** Barış Değirmenci
- **Ünvan:** Computer Education & Instructional Technologies Student
- **Okul:** Hacettepe University
- **Roller:** Graphic Designer, Game Developer, UX/UI Designer, Scrum Master, 3D Modeler

#### 🎨 Beceriler (Yüzdelerle)
- Adobe Illustrator: 90%
- Adobe Creative Suite: 70%
- Unity: 75%
- C#: 70%
- Blender (3D Modeling): 75%
- UX/UI Design: 80%
- Scrum Master: 85%

#### 💼 Projeler
1. **Sketch & Mockup** - 7 görsel
2. **Community Products** - 5 görsel
3. **School Works** - 4 görsel
4. **UX/UI Mobile App** - 17 UI ekranı
5. **Game Projects** - 3 YouTube video (Sergio, The Pearl, Academia of Googlewoods)
6. **Screenwriting Projects** - 2 PDF
7. **Catalogs** - 2 PDF (AGP Katalog, Vitaself)
8. **Activity Reports** - 4 PDF

#### 🔗 Sosyal Medya
- **LinkedIn:** https://www.linkedin.com/in/barış-değirmenci-98559a21b/
- **GitHub:** https://github.com/bobothemomo

#### 📧 İletişim
- **Formspree Action:** https://formspree.io/f/mpwdojad

---

## 🚀 Kurulum ve Kullanım

### Yerel Geliştirme

1. **Projeyi klonlayın veya indirin**
```bash
git clone https://github.com/bobothemomo/bobothemomo.github.io.git
cd bobothemomo.github.io
```

2. **Bir yerel web sunucusu başlatın**

**Seçenek 1:** Python kullanarak
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

**Seçenek 2:** VS Code Live Server eklentisi kullanarak
- VS Code'da `index.html` dosyasını açın
- Sağ tıklayıp "Open with Live Server" seçin

3. **Tarayıcınızda açın**
```
http://localhost:8000
```

### GitHub Pages'te Yayınlama

1. **Repository Ayarları**
   - GitHub repository'nizde Settings > Pages bölümüne gidin
   - Source olarak `main` branch'i seçin
   - Kaydedin

2. **Canlıya Alın**
```bash
git add .
git commit -m "Updated portfolio with new design"
git push origin main
```

3. **Sitenizi Görüntüleyin**
```
https://bobothemomo.github.io
```

---

## 📝 Özelleştirme

### Kişisel Bilgileri Değiştirme

1. **`index.html`** dosyasını açın
2. `📌 ESKİ İÇERİK:` yorumlarını arayın - bu bölümler eski içeriklerin nerede olduğunu gösterir
3. İlgili metinleri, linkleri ve görselleri güncelleyin

### Renkler ve Tema

**`assets/css/styles.css`** dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --hue-color: 250;  /* Renk tonu: 250=Mor, 142=Yeşil, 230=Mavi, 340=Pembe */
    --first-color: hsl(var(--hue-color), 69%, 61%);
    /* ... diğer renkler */
}
```

### Görselleri Değiştirme

- Yeni görselleri `assets/img/` klasörüne ekleyin
- `index.html`'de ilgili `<img>` etiketlerinin `src` özelliğini güncelleyin

### PDF'leri Güncelleme

- Yeni PDF'leri `assets/pdf/` klasörüne ekleyin
- `index.html`'de ilgili `<a href="assets/pdf/...">` linklerini güncelleyin

---

## 🔄 Yedek ve Geri Yükleme

### Yedek Klasörü
`bobothemomo.github.io_BACKUP/` klasörü eski projenin **TAM YEDEĞİNİ** içerir.

### Eski Tasarıma Geri Dönme

Eğer yeni tasarımda bir sorun olursa:

1. **Mevcut klasörü yedekleyin**
```bash
mv bobothemomo.github.io bobothemomo.github.io_NEW_BACKUP
```

2. **Eski yedeği geri yükleyin**
```bash
cp -r bobothemomo.github.io_BACKUP bobothemomo.github.io
```

---

## 🛠️ Teknolojiler

- **HTML5** - Semantic markup
- **CSS3** - Modern styling, CSS Grid, Flexbox
- **JavaScript (ES6+)** - Interactive features
- **Swiper.js** - Portfolio slider
- **Unicons** - Icon library
- **Google Fonts (Poppins)** - Typography
- **Formspree** - Contact form backend

---

## 📱 Responsive Breakpoints

- **Mobile:** < 568px
- **Tablet:** 568px - 768px
- **Desktop:** 768px - 1024px
- **Large Desktop:** > 1024px

---

## ⚡ Performans Optimizasyonu

- ✅ Minified CSS ve JS dosyaları
- ✅ Lazy loading görseller için hazır
- ✅ Optimize edilmiş görseller
- ✅ CDN kullanımı (Font Awesome, Google Fonts)
- ✅ Smooth scroll ve animasyonlar

---

## 🐛 Bilinen Sorunlar / TODO

- [ ] Mobile-app-mockup.html sayfası eski yapıda kaldı (gerekirse güncellenecek)
- [ ] Blog sayfası eklenmesi planlanıyor
- [ ] Daha fazla proje detay sayfası eklenebilir
- [ ] SEO optimizasyonları yapılabilir
- [ ] Analytics entegrasyonu eklenebilir

---

## 📄 Lisans

Bu proje kişisel portföy amaçlı oluşturulmuştur. Barış Değirmenci © 2024

---

## 📧 İletişim

Sorularınız için:
- **Email:** contact@barisdegirmenci.com
- **LinkedIn:** [Barış Değirmenci](https://www.linkedin.com/in/barış-değirmenci-98559a21b/)
- **GitHub:** [@bobothemomo](https://github.com/bobothemomo)

---

## 🙏 Teşekkürler

- **Bedimcode** - Template inspiration
- **Swiper.js** - Slider library
- **Formspree** - Contact form service
- **Unicons** - Icon library

---

**Son Güncelleme:** 2025-11-09  
**Versiyon:** 2.0 (Yeni Tasarım)
