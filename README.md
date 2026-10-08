<div align="center">

# Jacob Potts — Engineering Portfolio

**Computer Engineering · Embedded Software · Linux · Hardware Testing**

[![Portfolio](https://img.shields.io/badge/Live_Portfolio-Visit_Site-e6633d?style=for-the-badge\&logo=githubpages\&logoColor=white)](https://jacob-potts.github.io)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-1f4d41?style=for-the-badge\&logo=github\&logoColor=white)](https://pages.github.com/)

[View Portfolio](https://jacob-potts.github.io) · [View Resume](resume.pdf)

</div>

---

## About

This repository contains the source code for my personal engineering portfolio.

The website highlights my:

* Professional engineering experience
* Engineering projects
* Technical skills
* Education
* Resume and contact information

I am currently pursuing a blended **B.S./M.S. in Computer Engineering at California State University, Fullerton**, with interests in embedded software, Linux, hardware testing, and hardware–software integration.

## Technologies

The website is built with:

* HTML
* CSS
* Vanilla JavaScript
* GitHub Pages

No frameworks or build tools are required.

## Project Structure

```text
Jacob-Potts.github.io/
├── index.html          # page content
├── style.css           # datasheet theme, light/dark, print styles
├── script.js           # pin diagram, project links, theme toggle
├── jacob-potts-1000.jpg  # web-sized photo (original kept for social previews)
├── qr-code.svg       # QR code for jacob-potts.github.io (open with /#qr)
├── resume.pdf
└── README.md
```

## Local Development

Clone the repository:

```bash
git clone https://github.com/Jacob-Potts/Jacob-Potts.github.io.git
cd Jacob-Potts.github.io
```

Open `index.html` directly or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Updating the Website

Website content is located in `index.html`.

Styling and responsive layouts are located in `style.css`.

To show the QR code, open https://jacob-potts.github.io/#qr or tap the QR button in the header.

The pin diagram's labels and descriptions live in the `pins` array in `script.js`, and project card links live in `projectLinks` in the same file.

To update the resume, replace `resume.pdf` while keeping the same filename.

After making changes:

```bash
git add .
git commit -m "Update portfolio"
git push
```

## Contact

**Jacob J. Potts**
Computer Engineering — California State University, Fullerton

Email: [JacobJamesPotts@gmail.com](mailto:JacobJamesPotts@gmail.com)
GitHub: [github.com/Jacob-Potts](https://github.com/Jacob-Potts)
Portfolio: [Jacob-Potts.github.io](https://Jacob-Potts.github.io)

---

<div align="center">

© 2026 Jacob J. Potts

</div>
