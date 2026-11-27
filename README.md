# Barış Değirmenci — portfolyo (eskiz defteri)

Canlı adres: https://bobothemomo.github.io/ — önceki tasarım `eski-site/` klasöründe arşivli (https://bobothemomo.github.io/eski-site/).

```
./
├── index.html      Tek sayfa + vaka pencereleri (<template> içinde)
├── css/style.css   Tüm stiller (yerleşim, eskiz defteri öğeleri)
├── css/palettes.css  3 renk paleti (Leaf, Wax, Surf), Anton başlıklar ve menüdeki palet düğmeleri.
│                     Varsayılan: <html data-palette="leaf">; ziyaretçinin seçimi hatırlanır.
│                     Sekme simgesi palete göre img/favicon-<palet>.svg olur.
├── js/main.js      Dil düğmesi, vaka penceresi, lightbox, YouTube, kopyalama
├── img/            Web için küçültülmüş görseller (22 MB → 3,6 MB)
├── projects/phishing/  "Oltaya Gelmeyin" video oynatıcısı (index.html + media/) ve ham ilk sürüm
│                       (v1-2025.mp4). Videolar web için küçültüldü (387 MB → 85 MB). Oynatıcı
│                       sitede gömülüyken ?lang=tr|en alır ve yüksekliğini sayfaya bildirir.
└── docs/           CV ve PDF yayınlar
```

## Yerelde açmak

```
python -m http.server 8080
```

Sonra http://localhost:8080/ adresine git.

## İki dil (TR / EN)

> **İki dil açık.** Tarayıcısı Türkçe olan ziyaretçi Türkçe, diğerleri İngilizce görür; menüdeki
> TR/EN düğmesiyle değişir. Yalnızca İngilizce göstermek için `index.html` başındaki
> `data-tr-enabled="true"` değerini `"false"` yap.
>
> Türkçe başlıklar büyük harfe çevrilirken "i" → "İ" olur. Başlıktaki marka adlarını
> `<span lang="en-GB">Unity</span>` gibi işaretle, yoksa "UNİTY" çıkar.

Her metin iki kez yazılır, tarayıcı yalnızca seçili dili gösterir:

```html
<p lang="tr">Türkçe metin</p>
<p lang="en">English text</p>
<a href="#work"><span lang="tr">İşler</span><span lang="en">Work</span></a>
```

İlk açılışta tarayıcı dili Türkçe ise TR, değilse EN seçilir; seçim hatırlanır.
Görsel açıklamaları için `data-alt-tr` / `data-alt-en` kullan.

## Gece defteri (koyu tema)

Sağ üstteki güneş/ay düğmesiyle değişir. Ziyaretçi seçim yapana kadar işletim sisteminin ayarını takip eder.
Renkler `css/style.css` içindeki `:root[data-theme="dark"]` bloğunda.

Koyu temada çizimler iki şekilde görünür:
- `sketch--line` sınıfı olan siyah-beyaz çizimler ters çevrilir, siyah kâğıda beyaz kalemle çizilmiş gibi durur.
- Renkli çizimler (sınıf yok) açık renk bir kâğıda yapıştırılmış gibi gösterilir.

Yeni bir çizim eklerken siyah-beyazsa `class="sketch sketch--line"` kullan.

## İçerik güncelleme

- **Yeni proje:** `.pages` içine bir `<article class="page taped" style="--r: 1deg">` ekle,
  `data-case="xyz"` ver, altta `<template id="tpl-xyz">` oluştur ve `js/main.js`'teki `CASES` listesine ekle.
  `--r` kartın ne kadar eğik duracağı.
- **Yeni çizim:** `.sketches` içine bir `<figure class="sketch" style="--r: -1deg">` ekle.
  Beyaz arka planlı çizimler kâğıda otomatik karışır.
- **Gömülü Figma (veya başka iframe):** vaka şablonuna `<div class="figma-embed" title="..." data-embed="EMBED_URL"></div>`
  koy. iframe, kutu ekranda tam boyutuna ulaşınca oluşturulur; Figma tuvali başlangıç boyutuna göre ayarladığı için bu gerekli.
- **Yeni PDF:** dosyayı `docs/` içine koy, `#print` listesine bir `<li>` ekle.
- **CSS/JS değiştirince:** `index.html`'deki `style.css?v=3` / `main.js?v=2` numarasını artır,
  yoksa tarayıcı eski dosyayı gösterebilir.

Doğrudan link: `index.html#case-unipazar` gibi adresler ilgili vakayı açık başlatır.
