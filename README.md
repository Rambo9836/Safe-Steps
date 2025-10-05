# Safe Steps 🚶‍♂️

Safe Steps is a mobile application meant to support visually impaired users by working in tandem with a smart obstacle-detection belt. It offers real-time feedback (vibration and sound) about obstacles to help users walk more safely and confidently.

---

## 🧭 Table of Contents

- [Features](#features)  
- [Demo / Screenshots](#demo--screenshots)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Roadmap](#roadmap)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## ✨ Features

- **Bluetooth Connectivity** — Connects with the smart belt to receive sensor data in real time.  
- **Obstacle Detection Alerts** — Provides immediate feedback: “PATH CLEAR” vs “OBSTACLE DETECTED.”  
- **Customizable Feedback**  
  • Vibration alerts with adjustable intensity (Low / Medium / High)  
  • Optional sound alerts  
- **Accessible UI** — Clean, simple, and intuitive interface for ease of use  
- **Help & Support Section** — FAQs, guidance, and contact info included in-app  

---

## 📷 Demo / Screenshots

> _Insert screenshots or mockups from your Canva presentation here._  
> Example markdown you can use:

```md
![Home Screen](./assets/screenshots/home.png)  
![Settings Screen](./assets/screenshots/settings.png)  
![Alert Screen](./assets/screenshots/alert.png)  
🛠️ Tech Stack

Framework: React Native + Expo

Language: TypeScript

Navigation: Expo Router

UI / Graphics: Expo Vector Icons, Expo Linear Gradient

Project Setup / Tools: VS Code, ESLint / Prettier, etc.

🚀 Getting Started
Prerequisites

Node.js and npm (or Yarn) installed

Expo CLI globally:

npm install -g expo-cli

Installation Steps

Clone the repository

git clone https://github.com/Rambo9836/Safe-Steps.git


Move into project folder

cd Safe-Steps


Install dependencies

npm install


Start the development server / run the app

npm run dev

📲 Usage

Pair the mobile app with the smart belt device via Bluetooth.

As the user walks, the belt’s sensors detect obstacles and send data to the app.

The app triggers vibration and/or sound alerts depending on settings.

The UI shows status like “PATH CLEAR” or “OBSTACLE DETECTED.”

Users can configure alert strength and toggle sound in settings.

📌 Roadmap & Next Steps

Hardware Integration — Connect and test with the physical belt device

User Trials — Field testing with visually impaired participants to collect feedback

App Store Deployment — Prepare for iOS App Store and Google Play Store release

Voice / Gesture Controls — Add voice or gesture input features

Localization — Support multiple languages

🤝 Contributing

Your contributions are welcome! Here’s how:

Fork the repo

Create a feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m "Add feature")

Push the branch (git push origin feature/YourFeature)

Open a Pull Request
