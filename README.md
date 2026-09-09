# 🇮🇳 SAH-SAMARTH

### Smart AI-Powered Civic & Cooperative Sahayak

> **SCAN • SPEAK • UNDERSTAND • ACT**

SAH-SAMARTH is an AI-powered smart civic assistance solution designed to make government schemes, cooperative services, and citizen support **simple, accessible, multilingual, and actionable**.

The solution combines **AI, RAG-based information retrieval, speech interaction, QR-based access, and an IoT-enabled hardware interface** to bridge the gap between citizens and complex public-service information.

---

## Problem Statement

Many citizens face difficulties accessing and understanding government schemes and cooperative services because of:

* Complex government terminology and documentation
* Limited awareness of available schemes
* Language and literacy barriers
* Difficulty navigating multiple portals and sources
* Lack of personalized guidance
* Limited access to digital technology in rural and semi-urban areas

SAH-SAMARTH addresses these challenges through a **single, citizen-friendly AI assistant**.

---

## 💡 Proposed Solution

SAH-SAMARTH acts as a **Smart Civic Sahayak** that helps citizens discover, understand, and navigate relevant government and cooperative services.

### Core Approach

**Citizen → QR / Voice / Web → AI Assistant → Trusted Information → Guided Action**

The system is designed to:

1. Understand the citizen's query
2. Retrieve relevant information from trusted sources
3. Explain the information in simple language
4. Support multilingual and voice-based interaction
5. Guide the citizen toward the appropriate service or next step

---

## ✨ Key Features

### AI-Powered Assistance

Provides conversational assistance for civic and cooperative-related queries.

### RAG-Based Information Retrieval

Uses Retrieval-Augmented Generation to ground responses in relevant knowledge sources instead of relying only on general AI knowledge.

### Voice & Speech Interaction

Enables users to interact through speech, improving accessibility for users who may have difficulty typing.

### Multilingual Accessibility

Designed to make information easier to understand across different languages and user groups.

### QR-Based Access

Citizens can scan a QR code to quickly access the digital SAH-SAMARTH interface.

### Smart Hardware Interface

A hardware prototype demonstrates how SAH-SAMARTH can be deployed as a physical civic assistance kiosk/device.

### Guided User Experience

Instead of simply providing information, the system focuses on helping users understand **what to do next**.

---

# System Architecture

```text
                 ┌─────────────────────┐
                 │      CITIZEN        │
                 └──────────┬──────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
          QR / WEB                     VOICE
              │                           │
              └─────────────┬─────────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   SAH-SAMARTH UI    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ AI / Query Handling │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   RAG / Knowledge   │
                 │       Layer         │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Trusted Information │
                 │      Sources        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Simple, Actionable  │
                 │      Response       │
                 └─────────────────────┘
```

---

# Prototype

The project currently includes **two complementary prototypes**.

## 1. 💻 Software Prototype

An interactive web interface demonstrating the citizen-facing SAH-SAMARTH experience.

The prototype demonstrates:

* AI assistant interface
* Citizen-oriented navigation
* Scheme/service discovery
* Voice interaction concepts
* Multilingual accessibility
* QR-based access
* Responsive UI

## 2. 🔧 Hardware Prototype

An IoT-based physical prototype demonstrating how SAH-SAMARTH can be deployed beyond a traditional website.

The hardware concept can provide:

* Physical citizen interaction
* Voice-based assistance
* Accessible service discovery
* Standalone/community deployment possibilities

The hardware prototype is intended as a proof-of-concept for future deployment in **rural areas, cooperative societies, CSC-like environments, public offices, and community spaces**.

---

# 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3

### AI / Knowledge Layer

* Retrieval-Augmented Generation (RAG)
* Natural Language Processing
* Knowledge-base retrieval
* Conversational AI

### Voice

* Speech-to-Text
* Text-to-Speech
* Voice interaction

### Hardware

* ESP32-S3
* Sensors / peripherals as applicable
* Embedded interaction interface

### Development

* Git
* GitHub
* npm

---

# Project Structure

```text
SAH-SAMARTH/
│
├── public/
│
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

> The exact structure may evolve as backend, AI, and hardware integration progresses.

---

# Running the Software Prototype

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

## Installation

Clone the repository:

```bash
git clone http://localhost:5173/
```

Navigate to the project:

```bash
cd SAH-SAMARTH
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available through the local Vite development server.

---

# Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# Future Scope

SAH-SAMARTH is designed as a scalable foundation that can evolve into a complete civic assistance ecosystem.

### Planned Enhancements

* Integration with verified government APIs
* Larger domain-specific knowledge base
* Improved RAG pipeline
* More Indian language support
* Advanced speech recognition
* Accessibility-focused interaction modes
* Secure citizen authentication
* Analytics dashboard for service providers
* Cloud deployment
* Full hardware-software integration
* Community-level deployment
* Real-time scheme/service updates

---

# Impact

SAH-SAMARTH aims to reduce the **information gap** between citizens and public services.

### Expected Impact

**Accessibility**
→ Makes complex information easier to understand.

**Inclusivity**
→ Supports voice and multilingual interaction.

**Awareness**
→ Helps citizens discover relevant schemes and services.

**Efficiency**
→ Reduces the need to search through multiple sources.

**Scalability**
→ Can be deployed digitally as well as through physical community devices.

**Empowerment**
→ Moves citizens from simply receiving information to understanding the **next actionable step**.

---

# Responsible AI

SAH-SAMARTH is designed with a focus on:

* Trusted information sources
* Retrieval-grounded responses
* Clear communication
* Avoiding unsupported claims
* Human verification for critical decisions
* Privacy-conscious future architecture

The system is intended to **assist citizens**, not replace official government decision-making.

---

# Prototype Demonstration

### Software Prototype

**Live Demo:**
`<INSERT SOFTWARE PROTOTYPE LINK>`

### Hardware Simulation

**Demo:**
https://wokwi.com/projects/473885295435229185

### Source Code

**GitHub:**
https://github.com/sakshi-exe/SIH-2026.git

### QR Access

A QR code is provided in the project presentation/submission material to allow evaluators to directly access the prototypes.

---

# References & Resources

The project draws upon publicly available government resources, technical documentation, and research related to:

* Government schemes and citizen services
* Cooperative-sector information
* Retrieval-Augmented Generation
* Speech and language technologies
* ESP32-S3 / embedded systems
* Responsible AI

Relevant official documentation and research links are included in the project presentation and repository resources.

---

# Team

**Team QUANTUM NOMADS**

Built for **Smart India Hackathon 2026**

> **Technology should not make citizens learn the system.
> The system should learn to serve the citizen.**

---

## 🇮🇳 SAH-SAMARTH

### **SCAN • SPEAK • UNDERSTAND • ACT**

*A smart, accessible, AI-powered civic companion for a more informed and empowered citizen.*
