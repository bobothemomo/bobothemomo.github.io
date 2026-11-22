# Portfolio v2 — eskiz defteri

Mevcut siteden bağımsız yeni sürüm. Eski dosyalara dokunulmadı.

```
portfolio-v2/
├── index.html      Tek sayfa + vaka pencereleri (<template> içinde)
├── css/style.css   Tüm stiller; renkler en üstte :root değişkenlerinde
├── js/main.js      Dil düğmesi, vaka penceresi, lightbox, YouTube, kopyalama
├── img/            Web için küçültülmüş görseller (22 MB → 3,6 MB)
└── docs/           CV ve PDF yayınlar
```

## Yerelde açmak

```
python -m http.server 8080
```

Sonra http://localhost:8080/portfolio-v2/ adresine git.

## İki dil (TR / EN)

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
- **Yeni PDF:** dosyayı `docs/` içine koy, `#print` listesine bir `<li>` ekle.
- **CSS/JS değiştirince:** `index.html`'deki `style.css?v=3` / `main.js?v=2` numarasını artır,
  yoksa tarayıcı eski dosyayı gösterebilir.

Doğrudan link: `index.html#case-unipazar` gibi adresler ilgili vakayı açık başlatır.
