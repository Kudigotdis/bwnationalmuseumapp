# AI Agent Implementation Prompt for Museum App JSON Integration

## 🎯 Overview

This document provides clear instructions for guiding an AI agent (Claude, Copilot, etc.) in your IDE to properly integrate 24 JSON files into your Botswana Museum app.

---

## 📋 Prerequisites Checklist

Before asking your AI agent to implement, verify:

- [ ] All 24 JSON files exist in: `C:\Users\Kudzanai\Documents\2025\App Developments\BW Museum App\Botswana Museum Notes`
- [ ] Each JSON file has a `.json` extension
- [ ] You have the `museum_app_unified.html` file open in your IDE
- [ ] You understand the basic structure of your JSON files
- [ ] You're ready to create a `/data` folder in your project root

---

## 🤖 Prompt 1: Initial Setup & Folder Structure

### Use this prompt with your AI agent:

```
I'm building a museum app in HTML/JavaScript and need to integrate 24 JSON files.

TASK: Set up the folder structure and file organization

CONTEXT:
- App file: museum_app_unified.html (in web project root)
- JSON files location: C:\Users\Kudzanai\Documents\2025\App Developments\BW Museum App\Botswana Museum Notes
- I need to organize these files for web access

REQUIREMENTS:
1. Create a /data folder in my project root
2. List all 24 JSON filenames I should move there:
   - Botswana Animals.json
   - Botswana Plants & Trees.json
   - Comprehensive Guide to Botswana's Birds for Tourists.json
   - Botswana Foods and Beverages.json
   - Botswana Totems (Seboko).json
   - Botswana Traditional.json
   - Botswana Traditional Music.json
   - Initiation Ceremonies (Bogwera and Bojale).json
   - Botswana Funeral Rites.json
   - Botswana Marriage Customs.json
   - Botswana Naming Conventions.json
   - Botswana Folklore, Proverbs & Praise Poetry.json
   - Botswana Tswana Kingdoms.json
   - Botswana - Historical People.json
   - The Bantu Migration into Botswana.json
   - Botswana - The Arrival of Europeans.json
   - The Bechuanaland Protectorate.json
   - Botswana Museums.json
   - Main and Minority Languages.json
   - Botswana National Museum Events.json

3. Provide instructions for organizing the files

EXPECTED OUTPUT:
- Clear folder structure diagram
- List of files to copy
- Folder path structure
```

---

## 🤖 Prompt 2: Code Integration

### Use this prompt with your AI agent:

```
I have a museum app and 24 JSON files ready to integrate.

TASK: Add JSON loading and parsing code to museum_app_unified.html

CONTEXT:
- HTML file: museum_app_unified.html (~2100 lines)
- JSON location: ./data/[filename].json
- The app has these main tabs: ABOUT, EXPLORE, LEARN, MENU
- The app currently uses hardcoded arrays: CULTURES, CULTURE_SUB, ARTIFACTS, GAMES, MUSEUM_INFO

JSON FILES TO INTEGRATE:
Collections (EXPLORE tab):
- Botswana Animals.json
- Comprehensive Guide to Botswana's Birds for Tourists.json
- Botswana Plants & Trees.json
- Botswana Foods and Beverages.json
- Botswana Totems (Seboko).json

Cultures (LEARN tab):
- Botswana Traditional.json
- Botswana Traditional Music.json
- Initiation Ceremonies (Bogwera and Bojale).json
- Botswana Funeral Rites.json
- Botswana Marriage Customs.json
- Botswana Naming Conventions.json
- Botswana Folklore, Proverbs & Praise Poetry.json
- Botswana Tswana Kingdoms.json

History & Reference:
- Botswana - Historical People.json
- The Bantu Migration into Botswana.json
- Botswana - The Arrival of Europeans.json
- The Bechuanaland Protectorate.json
- Botswana Museums.json
- Main and Minority Languages.json
- Botswana National Museum Events.json

REQUIREMENTS:
1. Create async loadMuseumData() function that:
   - Fetches all 24 JSON files from ./data/ folder
   - Stores them in MUSEUM_DATA global object
   - Returns a promise that resolves when all files are loaded
   - Handles errors gracefully (missing files won't crash the app)

2. Create populateAppData() function that:
   - Transforms MUSEUM_DATA into CULTURES array
   - Transforms MUSEUM_DATA into CULTURE_SUB object
   - Transforms MUSEUM_DATA into ARTIFACTS array
   - Transforms MUSEUM_DATA into GAMES array
   - Updates MUSEUM_INFO from contact JSON

3. Map JSON to app structures:
   - Animals.json → ARTIFACTS['animals']
   - Birds.json → ARTIFACTS['birds']
   - Plants.json → ARTIFACTS['plants']
   - Foods.json → ARTIFACTS['foods']
   - Totems.json → ARTIFACTS['totems']
   - Traditional.json → CULTURES['traditions']
   - Music.json → CULTURES['music-dance']
   - Ceremonies JSON → CULTURES['ceremonies']
   - Historical People.json → Generate GAMES[0].questions

4. Insert code at the right place:
   - Add load functions AFTER data structure definitions (~line 700)
   - Update the init at the end to call loadMuseumData() before showTab('about')

EXPECTED OUTPUT:
- Complete, ready-to-paste JavaScript code
- Clear comments showing where code goes
- Error handling examples
- Console logging for debugging

QUALITY CHECKS:
- Code doesn't break if JSON files are missing
- No console errors on startup
- All 24 files mentioned in the load function
- Graceful fallback to default data if JSON fails
```

---

## 🤖 Prompt 3: Testing & Validation

### Use this prompt AFTER code implementation:

```
I've integrated 24 JSON files into my museum app and need to test it.

TASK: Verify the JSON integration is working correctly

CONTEXT:
- I've added loadMuseumData() and populateAppData() functions
- All JSON files are in ./data/ folder
- The app should populate CULTURES, ARTIFACTS, GAMES from JSON

TESTING REQUIREMENTS:
1. Create console logging functions to verify:
   - Check MUSEUM_DATA object has all loaded files
   - Log the count of items in ARTIFACTS collections
   - Log the count of CULTURES and their subgroups
   - Log the number of GAMES and questions in each game
   - Show any errors loading specific files

2. Create a test checklist for manual testing:
   - ABOUT tab loads without errors
   - EXPLORE tab shows collections (animals, birds, plants, foods)
   - Clicking a collection shows items from JSON
   - LEARN tab shows cultures (traditions, music, ceremonies)
   - Clicking a culture shows subgroups from JSON
   - Clicking a game shows questions generated from JSON
   - Back button works on all detail pages
   - Menu shows museum contact info from JSON

3. Create error handling improvements:
   - If 1-3 JSON files fail to load, app still functions
   - Show warning message (not error) if specific file fails
   - Provide fallback data so app doesn't crash

4. Provide:
   - debugMuseumData() function to log everything
   - Test steps to verify each tab works
   - Console commands to verify specific data loads

EXPECTED OUTPUT:
- Testing functions ready to paste
- Step-by-step testing guide
- Console commands to verify data
- How to identify which file failed loading
```

---

## 🤖 Prompt 4: Fine-Tuning & Edge Cases

### Use this prompt to refine the implementation:

```
I need to handle edge cases and ensure robust JSON integration.

TASK: Improve error handling and edge cases

CONTEXT:
- Some JSON files might have different structures
- Some might be missing fields
- Need to handle arrays vs objects

REQUIREMENTS:
1. Handle varying JSON structures:
   - Some files might have "animals", others "data", "items", etc.
   - Provide flexible property detection
   - Use fallback descriptions if summary/description missing

2. Safe data extraction:
   - Check if arrays exist before mapping
   - Provide empty objects/arrays if data missing
   - Show helpful console warnings for missing data

3. Duplicate handling:
   - Prevent duplicate items in collections
   - Handle if same JSON loaded twice
   - Ensure unique IDs for all items

4. Performance optimization:
   - Load JSON files in parallel (not sequentially)
   - Cache loaded data so it's not fetched twice
   - Debounce rapid tab switching

5. Provide:
   - Helper functions for safe data access
   - Try-catch blocks around JSON parsing
   - Validation functions for JSON structure
   - Performance metrics (time to load, file sizes)

EXPECTED OUTPUT:
- Enhanced load functions with error handling
- Safe property extraction helpers
- Validation functions
- Performance monitoring code
```

---

## 🤖 Prompt 5: Specific Data Mapping Issues

### Use this prompt if mapping specific JSON to UI isn't working:

```
TASK: Fix data mapping from [SPECIFIC_JSON_FILE] to [SPECIFIC_UI_ELEMENT]

CONTEXT:
- JSON file: [filename]
- UI location: [tab/section]
- Expected appearance: [description]
- Current problem: [what's not showing]

JSON STRUCTURE (from my file):
[paste relevant JSON snippet]

EXPECTED UI STRUCTURE:
[describe how it should appear]

Please provide:
1. Code to extract data from this JSON
2. How to populate the correct app structure
3. How to test if it's working
4. Console debug commands to verify

EXAMPLE JSON STRUCTURE I EXPECT:
{
  "title": "...",
  "items": [
    { "name": "...", "description": "..." }
  ]
}
```

---

## ✅ How to Use These Prompts

### Step-by-step workflow:

1. **Start with Prompt 1** (Setup)
   - Get folder structure organized
   - Copy files to /data folder

2. **Use Prompt 2** (Code Integration)
   - Get the main loading code
   - Add it to your HTML file
   - Test if files load

3. **Use Prompt 3** (Testing)
   - Create test functions
   - Run through all tabs
   - Verify data loads

4. **Use Prompt 4** (Edge Cases) - *Optional*
   - If app crashes or shows errors
   - If specific data isn't showing
   - For performance improvements

5. **Use Prompt 5** (Specific Mapping) - *As Needed*
   - For specific JSON files not working
   - When UI doesn't match expectations
   - For debugging specific sections

---

## 🔧 Before Each Prompt

Make sure you have:
1. The app file open in your IDE
2. The JSON folder organized
3. Specific error messages (if any) ready
4. A clear description of what's expected vs what you're seeing

---

## 📊 Quick Reference: File Mappings

When using the AI agent, refer to this table:

| JSON File | Primary Tab | UI Section | App Variable |
|-----------|------------|-----------|--------------|
| Botswana Animals.json | EXPLORE | Collections | ARTIFACTS |
| Botswana Birds.json | EXPLORE | Collections | ARTIFACTS |
| Botswana Plants & Trees.json | EXPLORE | Collections | ARTIFACTS |
| Botswana Foods.json | EXPLORE | Collections | ARTIFACTS |
| Botswana Totems.json | EXPLORE | Collections | ARTIFACTS |
| Botswana Traditional.json | LEARN | Cultures | CULTURES |
| Botswana Traditional Music.json | LEARN | Cultures | CULTURES |
| Initiation Ceremonies.json | LEARN | Cultures | CULTURES |
| Botswana Funeral Rites.json | LEARN | Cultures | CULTURES |
| Botswana Marriage Customs.json | LEARN | Cultures | CULTURES |
| Botswana Naming Conventions.json | LEARN | Cultures | CULTURES |
| Botswana Folklore.json | LEARN | Cultures | CULTURES |
| Botswana Tswana Kingdoms.json | LEARN | Cultures | CULTURES |
| Botswana Historical People.json | LEARN | Trivia | GAMES |
| Bantu Migration.json | LEARN | Trivia | GAMES |
| European Arrival.json | ABOUT | Exhibits | ARTIFACTS |
| Bechuanaland Protectorate.json | ABOUT | Exhibits | ARTIFACTS |
| Botswana Museums.json | MENU | Info | MUSEUM_INFO |
| Languages.json | LEARN | Cultures | CULTURES |
| Museum Events.json | ABOUT | Events | ARTIFACTS |

---

## 💡 Pro Tips for AI Agent Interaction

1. **Be Specific About Errors**
   - "I get a 404 error when loading Animals.json" vs "It's not working"
   - Show the exact error message

2. **Share File Structure**
   - Paste a sample of your JSON so AI knows the structure
   - This helps with correct data extraction

3. **Describe Expected Behavior**
   - "When I click a collection, it should show animals from the JSON"
   - "The LEARN tab should have a list of cultural topics"

4. **Provide Context**
   - Line numbers where code should go
   - What currently happens vs what should happen
   - Any special requirements

5. **Test Incrementally**
   - Get one collection working first
   - Then expand to others
   - Don't try to do all 24 files at once

---

## 🚀 Success Indicators

Your implementation is working when:

- ✅ No console errors on page load
- ✅ ABOUT tab shows museum content
- ✅ EXPLORE tab shows animal/bird/plant collections with items
- ✅ LEARN tab shows cultures with sub-topics
- ✅ Trivia games generate questions from JSON data
- ✅ Clicking items opens detail views
- ✅ Back button works everywhere
- ✅ Menu shows real museum info

---

## 📞 If Implementation Gets Stuck

Provide the AI agent with:

1. **The specific error message** from browser console
2. **Which JSON file isn't loading** (network tab shows 404?)
3. **Which tab/section isn't showing data** (ABOUT/EXPLORE/LEARN/MENU?)
4. **A sample of the JSON file** to check the structure
5. **The line numbers** where you inserted code

---

## 📝 Final Notes

- These prompts are designed for iterative development
- Start simple, add complexity gradually
- Test after each step
- Keep console.log statements during development for debugging
- Remove debug logging before final deployment

Good luck with your museum app! 🇧🇼
