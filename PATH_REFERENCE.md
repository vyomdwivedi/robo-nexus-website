# 📁 Path Reference Guide

## ✅ All Paths Fixed - Use This Guide

This document explains the correct path format for all files in the website.

---

## 🎯 Path Rules

### **Rule #1: HTML Files**
All links in HTML files use **absolute paths from root** starting with `/`

```html
<!-- ✅ CORRECT -->
<link href="/src/css/style.css" />
<script src="/src/js/script.js"></script>
<img src="/src/assets/images/logo.png" />
<a href="/src/html/about.html">About</a>
<a href="/index.html">Home</a>

<!-- ❌ WRONG -->
<link href="../css/style.css" />
<link href="src/css/style.css" />
```

### **Rule #2: JavaScript Files**
All fetch() and resource paths use **absolute paths from root** starting with `/`

```javascript
// ✅ CORRECT
fetch('/src/js/team.json')
onerror="this.src='/src/assets/images/Robo_Nexus_Logo.png'"

// ❌ WRONG
fetch('../js/team.json')
onerror="this.src='../assets/images/logo.png'"
```

### **Rule #3: JSON Files**

#### For team.json and alumni.json:
Use **relative paths WITHOUT leading slash** (script adds `/src/` prefix)

```json
{
  "image": "assets/images/photo.jpg"
}
```
This becomes: `/src/assets/images/photo.jpg` in the browser

#### For tutorials.json and events.json:
Use **absolute paths from root** starting with `/`

```json
{
  "image": "/src/assets/images/project.jpg"
}
```

---

## 📂 Directory Structure

```
robo-nexus-website/
├── index.html                    (root homepage)
├── netlify.toml                  (caching config)
├── src/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── script.js
│   │   ├── prefetch.js
│   │   ├── team.json
│   │   ├── alumni.json
│   │   ├── events.json
│   │   └── tutorials.json
│   ├── html/
│   │   ├── about.html
│   │   ├── team.html
│   │   ├── alumni.html
│   │   ├── contact.html
│   │   ├── events.html
│   │   └── projects.html
│   └── assets/
│       └── images/
│           ├── Robo_Nexus_Logo.png
│           ├── ARAY.jpeg
│           ├── AKSY.jpg
│           └── ...
```

---

## 🔧 Path Examples by File Type

### **index.html** (at root)
```html
<!-- Navigation -->
<a href="/src/html/about.html">About</a>
<a href="/src/html/team.html">Team</a>

<!-- Assets -->
<img src="/src/assets/images/Robo_Nexus_Logo.png" />
<link href="/src/css/style.css" />
<script src="/src/js/script.js"></script>
```

### **about.html** (in /src/html/)
```html
<!-- Navigation -->
<a href="/index.html">Home</a>
<a href="/src/html/team.html">Team</a>

<!-- Assets -->
<img src="/src/assets/images/Robo_Nexus_Logo.png" />
<link href="/src/css/style.css" />
<script src="/src/js/script.js"></script>
```

### **script.js** (in /src/js/)
```javascript
// Fetch JSON
fetch('/src/js/team.json')
fetch('/src/js/alumni.json')

// Image paths (adds /src/ prefix to JSON paths)
<img src="/src/${member.image}" />
// If JSON has: "assets/images/photo.jpg"
// Result: "/src/assets/images/photo.jpg"
```

### **team.json** (in /src/js/)
```json
{
  "members": [
    {
      "name": "John Doe",
      "image": "assets/images/john.jpg"
    }
  ]
}
```
**Note:** Script adds `/src/` prefix, so this becomes `/src/assets/images/john.jpg`

### **tutorials.json** (in /src/js/)
```json
{
  "tutorials": [
    {
      "title": "Robot",
      "image": "/src/assets/images/robot.jpg"
    }
  ]
}
```
**Note:** Use full absolute path here

### **events.json** (in /src/js/)
```json
{
  "pastEvents": [
    {
      "title": "Event",
      "images": ["/src/assets/images/event.jpg"]
    }
  ]
}
```
**Note:** Use full absolute path here

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake #1: Relative paths in HTML
```html
<!-- WRONG -->
<a href="../../index.html">
<img src="../assets/images/logo.png">
```

### ❌ Mistake #2: Relative paths in JavaScript
```javascript
// WRONG
fetch('../js/team.json')
```

### ❌ Mistake #3: Wrong prefix in JSON
```json
// WRONG for team.json
{
  "image": "/src/assets/images/photo.jpg"
}

// CORRECT for team.json
{
  "image": "assets/images/photo.jpg"
}
```

---

## ✅ Quick Reference Table

| File Type | Location | Path Format | Example |
|-----------|----------|-------------|---------|
| HTML links | Any HTML | `/path/from/root` | `/src/html/about.html` |
| CSS links | Any HTML | `/path/from/root` | `/src/css/style.css` |
| JS links | Any HTML | `/path/from/root` | `/src/js/script.js` |
| Images in HTML | Any HTML | `/path/from/root` | `/src/assets/images/logo.png` |
| Fetch in JS | Any JS | `/path/from/root` | `/src/js/team.json` |
| team.json images | team.json | `assets/images/...` | `assets/images/photo.jpg` |
| alumni.json images | alumni.json | `assets/images/...` | `assets/images/photo.jpg` |
| tutorials.json images | tutorials.json | `/src/assets/...` | `/src/assets/images/robot.jpg` |
| events.json images | events.json | `/src/assets/...` | `/src/assets/images/event.jpg` |

---

## 🔍 How to Test Paths

### 1. Open Browser DevTools (F12)
### 2. Go to Network Tab
### 3. Reload page
### 4. Look for 404 errors (red)

**If you see 404 errors:**
- Check the failed URL
- Compare with this guide
- Fix the path in the source file

### 5. Check Console Tab
Look for errors like:
```
Failed to load resource: net::ERR_FILE_NOT_FOUND
```

---

## 💡 Why Absolute Paths?

### Benefits:
1. ✅ **Consistent caching** - Same URL = same cache entry
2. ✅ **No path confusion** - Works from any page depth
3. ✅ **Easier debugging** - Clear what's being requested
4. ✅ **Better performance** - Browser caches more effectively

### Before (Relative Paths):
```
index.html loads: src/css/style.css
about.html loads: ../css/style.css
```
Browser sees these as **different files** → downloads twice!

### After (Absolute Paths):
```
index.html loads: /src/css/style.css
about.html loads: /src/css/style.css
```
Browser sees these as **same file** → downloads once, cached forever!

---

## 🎉 All Fixed!

All paths in the website have been updated to follow these rules. Your images, CSS, JavaScript, and navigation should all work perfectly now!

If you add new content, refer to this guide to use the correct path format.
