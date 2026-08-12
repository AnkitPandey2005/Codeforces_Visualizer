# 🎯 Codeforces Visualizer

<div align="center">

![Codeforces](https://img.shields.io/badge/Codeforces-Ready-brightgreen?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Pure-orange?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Pure-blue?style=for-the-badge&logo=css3)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

A powerful, lightning-fast web application to visualize and track your **Codeforces** competitive programming journey in real-time! 📊

Built entirely with pure HTML, CSS, and Vanilla JavaScript for maximum performance with zero dependencies.

</div>

---

## 📖 Introduction

**Codeforces Visualizer** is a streamlined frontend application designed for competitive programmers. By simply entering a valid Codeforces handle, you can instantly pull comprehensive insights into a user's competitive history. 

This project was engineered to be exceptionally lightweight, relying entirely on the native DOM API and the public Codeforces API—meaning no build steps, no node_modules, and zero heavy frameworks.

---

## ✨ Features

🚀 **Real-time Profile Analytics**
- Fetch core profile details (Avatar, Name, Location, Organization).
- View total friends on the platform.

🏆 **Advanced Contest Tracking**
- **Rating History:** Displays current and maximum all-time rating and rank.
- **Best Contest Performance:** Automatically scans the user's entire competitive history to determine and display their highest achieved rank in a single contest.

💡 **Problem Solving Statistics**
- **Unique Solved Count:** Intelligently counts only accepted (`OK`) verdicts, filtering out duplicate submissions.
- **Last Solved Problem:** Displays the most recently accepted problem along with a direct, clickable link to solve it on Codeforces.
- **Algorithmic Tag Breakdown:** Generates a complete distribution of successfully solved problems categorized by algorithm tags (e.g., `math`, `greedy`, `dp`, `graphs`).

⚡ **Smooth User Experience**
- **Dynamic Shimmer Loader:** Features a modern, animated placeholder while fetching data.
- **Robust Error Handling:** Safely catches empty inputs, invalid user handles, and network failures with clean UI error messages.
- **Instant Refetching:** Perform back-to-back searches seamlessly without ever needing to reload the page.

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Structure:** Semantic HTML5
- **Styling:** CSS3 (Flexbox, CSS Animations)
- **Data Source:** [Codeforces Public API](https://codeforces.com/apiHelp)

---

## 🚀 How to Run the Project

Since this project uses no bundlers or backend frameworks, it is incredibly easy to run locally.

### Using VS Code Live Server (Recommended)
1. Clone or download the repository to your local machine.
2. Open the project folder (`Codeforces-Visualizer`) in **VS Code**.
3. Install the **Live Server** extension.
4. Right-click on the `index.html` file in the file explorer.
5. Select **Open with Live Server**.
6. The app will automatically launch in your default browser!

### Alternative Local Testing
If you have Python installed, you can start a simple static server from your terminal:
```bash
python -m http.server 5500
```
Then visit `http://localhost:5500` in your browser.

*(Note: While you can double-click `index.html` to view the page, running it through a local server is recommended to ensure secure API fetching).*

---

## 📝 License

This project is licensed under the **MIT License**.

Copyright (c) 2024 Codeforces Visualizer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

<div align="center">
**Made with ❤️ for competitive programmers**
</div>