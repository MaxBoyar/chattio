[//]: # (prerequistis commands:)

[//]: # (    npm i)

[//]: # (    for mac users:)

[//]: # (    brew tap mongodb/brew*)

[//]: # (    brew install mongodb-community*)

[//]: # (    brew services start mongodb-community*)

[//]: # (    )
[//]: # ()
[//]: # (in chat client folder run this:)

[//]: # (    npm run dev)

[//]: # ()
[//]: # (in chat server folder run this:)

[//]: # (    npm run dev)


Chattio
Welcome to Chattio! This repository contains the source code and documentation for Chattio, a real-time chat application designed to enhance communication with an intuitive interface and reliable performance.

Table of Contents
Overview
Features
Getting Started
Installation
Usage
Contributing
License
Overview
Chattio is a chat application focused on providing a seamless and interactive messaging experience. Built with modern web technologies, it’s scalable, customizable, and suitable for both personal and team communication.

Features
Real-time Messaging: Instant messaging for efficient communication.
User Authentication: Secure login to protect privacy.
Responsive Design: Works across desktop and mobile devices.
Customizable Themes: Choose between light and dark themes.
Group Chats: Create and manage group conversations easily.
File Sharing: Share images, documents, and more.
Getting Started
Follow these instructions to set up Chattio on your local machine.

Prerequisites
Make sure you have the following installed:

Node.js (v14 or above recommended)
npm or yarn
Additional Requirements for Mac Users
If you’re using macOS, you’ll need to install MongoDB using Homebrew:

Tap MongoDB:

bash
Copy code
brew tap mongodb/brew
Install MongoDB Community Edition:

bash
Copy code
brew install mongodb-community
Start MongoDB as a Service:

bash
Copy code
brew services start mongodb-community
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/MaxBoyar/chattio.git
Navigate to the project directory:

bash
Copy code
cd chattio
Install dependencies:

bash
Copy code
npm install
or, if using yarn:

bash
Copy code
yarn install
Usage
To start the Chattio application:

In the Chat Client Folder:

Start the client using:

bash
Copy code
npm run dev
In the Chat Server Folder:

Start the server using:

bash
Copy code
npm run dev
The application should now be accessible at http://localhost:3000.

Contributing
We welcome contributions! To get started:

Fork this repository.
Create a new branch:
bash
Copy code
git checkout -b feature/YourFeatureName
Make your changes and commit them.
Push to your forked repository and submit a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

This version provides a clear breakdown of prerequisites, installation, and usage instructions, making it more user-friendly and professional. Let me know if you want any additional sections or customization!