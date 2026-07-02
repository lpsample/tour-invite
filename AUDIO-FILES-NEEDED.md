# Audio Files Needed for Mobile Sound Effects

To enable sound effects on mobile devices, you need to add these audio files to your project:

## Required Files

Create a folder: `assets/sounds/`

Add these two files:
1. **tap.mp3** - Glass tap/crack sound
2. **shatter.mp3** - Glass shattering sound

## File Structure
```
album-preview-invite/
├── assets/
│   ├── sounds/
│   │   ├── tap.mp3
│   │   └── shatter.mp3
│   ├── album-art.jpg
│   └── reveal-song.wav
```

## Where to Get Sound Effects

### Option 1: Free Sound Libraries
- **Freesound.org** - https://freesound.org/
  - Search for "glass tap" and "glass shatter"
  - Download as MP3
  - Free with attribution

- **Zapsplat** - https://www.zapsplat.com/
  - Search for glass sounds
  - Free for personal/commercial use

### Option 2: Create Your Own
- Record actual glass sounds
- Use audio editing software (Audacity, GarageBand)
- Export as MP3

## Recommended Sound Characteristics

**tap.mp3:**
- Duration: 0.1-0.3 seconds
- Sharp, crisp glass tap sound
- Not too loud

**shatter.mp3:**
- Duration: 0.5-1.5 seconds
- Dramatic glass breaking/shattering
- Can be louder and more impactful

## After Adding Files

1. Place the files in `assets/sounds/`
2. Commit and push to GitHub:
   ```bash
   cd /Users/lindseysample/Documents/GitHub/album-preview-invite
   git add assets/sounds/
   git commit -m "Add mobile sound effects"
   git push
   ```
3. Wait 1-2 minutes for GitHub Pages to update
4. Test on mobile!

## How It Works

- **Desktop**: Uses synthesized Web Audio API sounds (works automatically)
- **Mobile**: Uses your MP3 files (requires the files above)
- The code automatically detects mobile and uses the appropriate method

## Current Status

✅ Code is ready and will automatically use audio files on mobile
⏳ Waiting for you to add tap.mp3 and shatter.mp3 files