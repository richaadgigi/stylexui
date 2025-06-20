# StyleXui

A lightweight and modern CSS framework designed to streamline your development process effortlessly.

## 🚀 Overview

StyleXui, also known as **Style You**, is a CSS framework built to enhance your workflow with pre-designed components and utility classes. Whether you're an experienced developer or just starting out, StyleXui helps you build stunning, responsive UIs with ease.

Created by **Richard Gigi**, co-founder of **Xnyder**, StyleXui was developed to tackle common design inefficiencies in modern web development.

Dive in and see how StyleXui can bring your projects to life! 🎨✨

---

## 🌟 Features

✔ **Fully Responsive** – Built with a mobile-first approach, ensuring flawless adaptability across all screen sizes. Whether on a phone, tablet, or desktop, your design remains pixel-perfect and seamless.

✔ **Pre-Built Components** – Speed up development with a library of ready-to-use elements like buttons, modals, and navigation bars. No need to build from scratch—just plug, customize, and launch.

✔ **Effortless Customization** – A utility-first framework that lets you style elements with ease, keeping your code clean and efficient. Define your own colors, spacing, and units—your design, your way.

✔ **Accessibility-First** – Designed with inclusivity in mind, ensuring smooth navigation and interaction for all users, regardless of ability.

✔ **Seamless Light & Dark Mode** – Instantly switch between bright and dark themes for a comfortable viewing experience, day or night.

✔ **Comprehensive Documentation** – A well-structured, beginner-friendly guide to help you get started effortlessly and make the most out of StyleXui. 

✔ **JavaScript Enhancements** – Optional JavaScript for interactive components with smooth animations and behaviors.

---

## 📦 Installation

### 1️⃣ Via CDN *(Quickest Setup)*
Add the following `<link>` tag to your HTML file:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.stylexui.com/@v1.0.1/css/xui.css" />

<!-- Optional JavaScript (for interactive components) -->
<script src="https://cdn.stylexui.com/@v1.0.1/js/xui.js" defer></script>
```
✅ Best for: Prototyping, static HTML projects, minimal dependencies.

### 2️⃣ NPM/Yarn *(For Modern Frameworks)*

**Using NPM:**
```sh
npm install @richaadgigi/stylexui
```

**Using Yarn:**
```sh
yarn add @richaadgigi/stylexui
```

Then, import it in your project:
```js
import '@richaadgigi/stylexui/css/xui.min.css';
import { apply } from '@richaadgigi/stylexui';
import './src/stylexui/dynamic.css'; // Automatically Use Dynamic CSS 

apply();
```
✅ Best for: React, Vue, Angular, scalable projects, and version control.

### 3️⃣ Manual Download *(Offline or Custom Hosting)*

1. Download the latest version from the [official website](https://stylexui.com) or the [zip file](https://github.com/richaadgigi/stylexui/archive/refs/tags/v1.0.1.zip).
2. Extract the files and link the CSS in your HTML file:

```html
<!-- CSS -->
<link rel="stylesheet" href="path/to/xui.css" />

<!-- Optional JavaScript (for interactive components) -->
<script src="path/to/xui.js" defer></script>
```
✅ Best for: Legacy systems, static projects, or custom hosting.

---

## 🔧 Getting Started

### Basic HTML Boilerplate

Copy and paste the following template to start using StyleXui:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My StyleXui Project</title>
    <link rel="stylesheet" href="path/to/xui.css">
</head>
<body>
    <div class="xui-container">
        <h1>Welcome to StyleXui</h1>
        <p>Build modern, responsive, and accessible UIs with ease.</p>
        <button class="xui-btn xui-btn-primary">Get Started</button>
    </div>

    <!-- Optional StyleXui JS (for interactive components) -->
    <script src="path/to/xui.js"></script>
</body>
</html>
```

Visit our documentation to [learn more](https://doc.clickup.com/9012486388/p/h/8cjz87m-2112/8989912e92c935b/8cjz87m-2112).

---

## 📜 Release Notes

### 🔹 Version 1.0.0 (Beta)
✅ Initial release of StyleXui! 🚀

✅ Includes core CSS utilities and components

✅ Optional JavaScript for interactive elements

✅ Comprehensive documentation

### 🔹 Version 1.0.1
✅ Fixed: Ripple effect animation now works as expected for better visual feedback.

🧼 Updated: Dashboard redesigned with a cleaner and neater UI for improved clarity and user experience.

🧩 New Utility: Introduced "xui-bdr-rad-none" to easily apply "border-radius: none".

📂 Dashboard Navigation: Now supports dropdowns for subpages, making multi-level navigation seamless.

🚀 Improved Styling Logic: Dynamic CSS now uses !important to ensure proper style overrides.

---
## 🌍 Contribution

We welcome contributions! Feel free to submit issues or pull requests to help improve StyleXui.

## 📜 License

StyleXui is open-source and distributed under the **MIT License**, ensuring flexibility for both personal and commercial use.

### 🔑 Key Terms of MIT License
- ✅ **Permitted Uses:** Personal, commercial, and enterprise applications. Modification, distribution, and sublicensing allowed.
- ❌ **Restrictions:** No warranty or liability for damages. Must retain copyright notices.

### 📌 Third-Party Dependencies
StyleXui utilizes **normalize.css v3.0.1** to ensure consistent styling across browsers. Normalize.css is also licensed under the MIT License.

For full licensing details, refer to the [MIT License documentation](https://opensource.org/licenses/MIT).

---

## 🔗 More Information

📌 **Official Website:** [StyleXui](https://stylexui.com)  
📌 **Support & Issues:** [GitHub Issues](https://github.com/richaadgigi/stylexui/issues)

✨ **Enjoy building with StyleXui!** 🎨🚀
