# Ancient Scribe

Project Title: Script Decode

Project Type: AI-powered Web Application

Description: Build a modern, responsive web application called "Script Decode" focused on Egyptian script analysis and archaeology assistance. The website should have a clean UI, easy navigation, and AI-powered features.

Homepage (Landing Page):

Design a visually appealing homepage with a historical/Egyptian theme (pyramids, papyrus style, ancient textures).

Display 3 main buttons centered on the page:

Script Translation

Full Script

Pastoria (Chatbot)

Each button should navigate to a separate page.

Feature 1: Script Translation Page

Page title: "Script Translation"

Include an Upload Image button

Allow users to upload images containing Egyptian letters/symbols (hieroglyphs)

After upload:

Use AI-based image recognition (OCR + symbol classification)

Detect Egyptian characters

Translate them into English words

Display:

Uploaded image preview

Extracted symbols

Translated English text

Add loading animation while processing

Feature 2: Full Script Reconstruction Page

Page title: "Full Script"

Include Upload Image button

User uploads damaged, partial, or broken Egyptian scripts

AI should:

Analyze missing or unclear parts

Predict and reconstruct the complete script

Display:

Original uploaded image

Reconstructed full script (visual or text)

Explanation of reconstruction (optional but preferred)

Feature 3: Pastoria (Archaeology Chatbot)

Page title: "Pastoria"

Create a chatbot interface (chat UI like messaging apps)

The chatbot should:

Only answer questions related to Egypt, archaeology, history, hieroglyphs

Reject unrelated queries politely

For each user question:

Provide at least 5 bullet-point answers

Keep answers clear and informative

Add quick suggestion prompts like:

"What are hieroglyphs?"

"Who built the pyramids?"

"Explain mummification"

Technical Requirements:

Frontend: Modern UI (React or similar recommended)

Backend: Node.js / Python (Flask or FastAPI)

AI Integration:

Image recognition (OCR for symbols)

Machine learning model for hieroglyph translation

NLP model for chatbot

Responsive design (mobile + desktop)

Smooth navigation between pages

Extra Features (Optional but Recommended):

Dark mode / Ancient theme toggle

History of uploaded images

Download results option

Voice input for chatbot

UI Style:

Egyptian-inspired colors (gold, sand, dark brown)

Use icons for buttons

Clean, minimal, and modern layout

Goal:

Create an intelligent platform that helps users:

Translate Egyptian scripts

Restore damaged inscriptions

Learn archaeology through an AI chatbot
with using the glassmorphism for all the pages

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://scriptdecode.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/079dfc62-0d5b-479b-9143-14c3a8970039).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
