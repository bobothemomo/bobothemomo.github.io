# Game Showcase Page Setup Guide

## 🎮 What's New

I've created a dedicated **Game Development Showcase** page (`game-showcase.html`) that displays your Unity games with embedded video players, descriptions, tags, and links.

---

## 📝 How to Add Your Real Game Videos

The page currently has placeholder YouTube embeds. Here's how to add your actual game videos:

### Step 1: Get YouTube Video IDs

1. Go to your YouTube video
2. Look at the URL: `https://www.youtube.com/watch?v=VIDEO_ID_HERE`
3. Copy the `VIDEO_ID_HERE` part

**Example:**
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`

### Step 2: Update the Embed Links

Open `game-showcase.html` and find these lines for each game:

**Sergio Game (around line 122):**
```html
<iframe src="https://www.youtube.com/embed/YOUR_SERGIO_VIDEO_ID"
```

**The Pearl Game (around line 145):**
```html
<iframe src="https://www.youtube.com/embed/YOUR_PEARL_VIDEO_ID"
```

**Academia of Googlewoods (around line 168):**
```html
<iframe src="https://www.youtube.com/embed/YOUR_ACADEMIA_VIDEO_ID"
```

Replace `YOUR_SERGIO_VIDEO_ID`, etc. with your actual YouTube video IDs.

### Step 3: Update Game Descriptions (Optional)

You can customize the game descriptions in the `game-description` class paragraphs to better match your actual games.

---

## 🎯 Features of the New Page

### **Embedded Video Players**
- Full 16:9 responsive video players
- Click play to watch directly on your portfolio
- No need to leave the site

### **Game Cards**
Each game has:
- ✅ Embedded video player
- ✅ Game title
- ✅ Detailed description
- ✅ Technology tags (Unity, C#, game genre)
- ✅ "Watch on YouTube" button
- ✅ Hover animations

### **Professional Layout**
- Responsive grid (3 columns on desktop, 1 on mobile)
- Cards lift up on hover
- Breadcrumb navigation
- Back button to portfolio

### **YouTube Channel Link**
- Prominent section at bottom
- Links to your full YouTube channel
- Encourages visitors to subscribe

---

## 🔗 What Changed in Portfolio

**Before:**
```html
<a href="https://www.youtube.com/@barisd2695" target="_blank">
    Watch Demos
</a>
```

**After:**
```html
<a href="game-showcase.html">
    View Games
</a>
```

Now clicking "View Games" on the Game Development portfolio card opens the dedicated showcase page instead of going to YouTube.

---

## 🎨 Customization Options

### Add More Games

To add more games, copy this template in `game-showcase.html`:

```html
<div class="game-card">
    <div class="game-video">
        <iframe src="https://www.youtube.com/embed/VIDEO_ID" 
                title="Your Game Name" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
    </div>
    <div class="game-info">
        <h3 class="game-title">Your Game Name</h3>
        <p class="game-description">
            Your game description here...
        </p>
        <div class="game-tags">
            <span class="game-tag">Unity</span>
            <span class="game-tag">C#</span>
            <span class="game-tag">Genre</span>
        </div>
        <div class="game-links">
            <a href="https://www.youtube.com/@barisd2695" target="_blank" class="game-btn game-btn-primary">
                <i class="uil uil-youtube"></i> Watch on YouTube
            </a>
        </div>
    </div>
</div>
```

### Add Playable Links

If you have playable versions (e.g., on itch.io), add this button in `game-links`:

```html
<a href="YOUR_GAME_LINK" target="_blank" class="game-btn game-btn-secondary">
    <i class="uil uil-play"></i> Play Game
</a>
```

### Add GitHub Links

If your games are open source, add:

```html
<a href="YOUR_GITHUB_REPO" target="_blank" class="game-btn game-btn-secondary">
    <i class="uil uil-github"></i> View Code
</a>
```

---

## 📱 Mobile Responsive

The page automatically adjusts:
- **Desktop:** 3 game cards per row
- **Tablet:** 2 game cards per row  
- **Mobile:** 1 game card per row
- Videos scale perfectly on all devices

---

## 🚀 Next Steps

1. **Add your real YouTube video IDs** (replace the placeholder ones)
2. **Update game descriptions** to match your actual games
3. **Test the videos** - make sure they play correctly
4. **Add more games** if you have them (use the template above)
5. **Customize tags** to match your game features

---

## 🎯 User Flow

```
Portfolio → Click "View Games" → Game Showcase Page
    ↓
Watch embedded videos
    ↓
Click "Watch on YouTube" for full video
    ↓
Click "Visit YouTube Channel" for more content
```

---

## ✨ Benefits

- **Professional presentation** - Videos embedded directly in your portfolio
- **Better UX** - Users don't leave your site to watch demos
- **More engagement** - Easier to showcase multiple games
- **SEO friendly** - All content on your domain
- **Consistent branding** - Matches your portfolio design

---

**Your game showcase is ready! Just add your YouTube video IDs and you're all set! 🎮**

