# Smart Grocer - Grocery Shopping App

A modern, cross-platform grocery shopping application built with React Native, Expo, and Firebase.

## 🚀 Features

- **Shopping List Management**: Easily add, remove, and track your grocery items
- **Smart Categorization**: Browse products by categories
- **Purchase Tracking**: Keep track of recently purchased items
- **User Authentication**: Secure login and signup
- **Cross-Platform**: Works on iOS, Android, and web

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: React Context API
- **Type Safety**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/SiddhiKarwar/grocery-application.git
   cd grocery-application
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up Firebase
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password) and Firestore Database
   - Create a new web app in Firebase console
   - Copy your Firebase config to `firebaseConfig.js`

4. Start the development server
   ```bash
   npx expo start
   ```

## 📱 Running the App

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Web**: Press `w` in the terminal
- **Physical Device**: Scan the QR code with your device's camera (Expo Go app required)

## 📂 Project Structure

```
grocery-application/
├── app/                  # App routes and navigation
│   ├── (tabs)/           # Tab navigation screens
│   ├── contexts/         # React Context providers
│   └── auth.tsx          # Authentication screens
├── assets/               # Static assets
├── components/           # Reusable components
│   ├── common/           # Shared components
│   ├── grocery/          # Grocery-related components
│   └── home/             # Home screen components
├── constants/            # App constants and theme
└── hooks/                # Custom React hooks
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [NativeWind](https://www.nativewind.dev/)

## 📸 Screenshots

*Add your app screenshots here*

## 🔧 Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```
