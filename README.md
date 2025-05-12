# Voice-Activated AR Interface Concept

This project is a prototype and learning exercise exploring the capabilities of the Web Speech API for creating voice-activated user interfaces (VUI), presented within a simulated Augmented Reality (AR) context. It's built using React, TypeScript, and Vite.

The core of the application is a self-contained presentation that explains the concepts, design considerations, and technical implementation behind this VUI exploration. You can navigate this presentation and control parts of the UI using voice commands.

## Live Demo

You can try the live demo deployed on Netlify:
**[https://voice-activated-ar-interface.netlify.app/](https://voice-activated-ar-interface.netlify.app/)**

*(Screenshot placeholder: Consider adding a screenshot or GIF of the app in action here!)*

## Features

* **Voice Command Recognition:** Utilizes the browser's Web Speech API to listen for and transcribe voice input.
* **Presentation Navigation:** Control the flow of the informational slides using voice commands like "next", "back", and "go to [topic]".
* **UI Control:** Show, hide, and resize elements like the command list and the presentation panel via voice.
* **Visual Feedback:** Displays the last recognized command and indicates when a command is being processed.
* **Informational Content:** The presentation slides detail the project's goals, UX considerations, technical approach, and learnings.

## Voice Commands

Press the "Start Listening" button and try saying:

* `show commands` - Displays the list of available commands.
* `hide commands` - Hides the list of available commands.
* `next` - Go to the next concept slide.
* `back` - Go to the previous concept slide.
* `go to [topic]` - Go to a specific concept slide (e.g., "go to handling voice", "go to tech stack").
* `show presentation` - Shows the project details view if hidden.
* `hide presentation` - Hides the project details view.
* `presentation small` - Resizes presentation view to the default (left side).
* `presentation large` - Resizes presentation view to be larger (centered).

*(Note: The background color change command mentioned in the code comments might also work but isn't listed in the primary command list.)*

## Technology Stack

* **Frontend:** React, TypeScript
* **Build Tool:** Vite
* **Speech Recognition:** Web Speech API (native browser implementation)
* **Routing:** React Router
* **Styling:** CSS (potentially CSS Modules based on common Vite setups)
* **Deployment:** Netlify
* **Version Control:** GitHub

## Getting Started / Running Locally

### Prerequisites

* **Node.js & npm (or yarn):** Required for installing dependencies and running the development server. Download from [nodejs.org](https://nodejs.org/).
* **Browser:** A modern browser that supports the Web Speech API (e.g., Google Chrome, Microsoft Edge).
* **Microphone:** A functional microphone is needed for voice input. You will need to grant the browser permission to access it.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/uniqueux13/Voice-Activated-AR-Interface-Prototype.git](https://github.com/uniqueux13/Voice-Activated-AR-Interface-Prototype.git)
    cd Voice-Activated-AR-Interface-Prototype
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or if you use yarn:
    # yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or if you use yarn:
    # yarn dev
    ```
    This will start the Vite development server, typically available at `http://localhost:5173` (check your terminal output for the exact URL).

4.  Open the application in your compatible browser, grant microphone permissions, and use the "Start Listening" button and voice commands.

## Project Structure Highlights

* `src/App.tsx`: Main application component, handles state management, command processing, and routing logic. Contains the slide content.
* `src/pages/Presentation.tsx`: Renders the current presentation slide based on the index passed from `App.tsx`.
* `src/components/SpeechRecognitionComponent.tsx`: Encapsulates the logic for interacting with the Web Speech API, handling listening state, results, and errors.
* `src/components/Instructions.tsx`: Renders the list of available commands (though command display is directly implemented in `App.tsx` based on the provided code).

## Key Learnings (from project goals)

* The Web Speech API provides an accessible way to implement basic voice recognition in web applications.
* Designing effective VUI requires careful consideration of user feedback and command structures.
* Achieving truly seamless, context-aware voice interaction, especially in an AR context, presents significant challenges beyond basic command recognition.

## License

[Specify your license here, e.g., MIT. Remember to add a LICENSE file to your repository.]

*(Example: This project is licensed under the MIT License.)*
