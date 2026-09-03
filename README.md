# 🚀 GitOps-Driven React Portfolio & Digital Garden

A highly modular, serverless developer portfolio and engineering blog built with React and Tailwind CSS. This project abandons traditional databases in favor of a **GitOps architecture**—using the GitHub API as a headless CMS and GitHub Actions for continuous deployment.

## ✨ Key Features

* **Headless GitHub CMS:** A custom `/admin` React route securely accepts a GitHub Personal Access Token (PAT) to generate, commit, and push new Markdown engineering logs directly to the repository via the GitHub REST API.
* **Serverless Architecture:** Zero backend infrastructure. State is managed entirely by the Git repository. 
* **Automated CI/CD:** Any commit to the main branch (whether from the Admin UI or a direct push) triggers a GitHub Actions pipeline that builds the React app and deploys it to GitHub Pages seamlessly.
* **Feature Flags:** Built-in data filtering allows for `"draft": true` flags on projects, keeping work-in-progress content hidden from the production build without deleting the data.
* **Advanced Markdown Engine:** Blogs are parsed securely using `react-markdown`.
  * `rehype-slug`: Auto-generates anchor IDs for deep-linking.
  * `rehype-raw`: Safely allows iframe embeds (YouTube/Google Drive) for zero-cost, ad-free rich media streaming.
* **Hash-Routing Interceptors:** Custom component interceptors ensure smooth scrolling for same-page anchors and cross-blog deep linking within the React `HashRouter` context.

## 🛠 Tech Stack

* **Frontend:** React.js, React Router (HashRouter)
* **Styling:** Tailwind CSS (with Typography plugin for Markdown prose)
* **Content Parsing:** `react-markdown`, `rehype-raw`, `rehype-slug`
* **Data Layer:** Local JSON objects & `.md` files
* **Deployment & CI/CD:** GitHub Actions & GitHub Pages
* **CMS API:** GitHub REST API

---

## 🏗 Architecture Overview

This portfolio operates on the principle of the repository as the **Single Source of Truth**:

1. **Content Creation:** The user writes a post in the custom Admin UI.
2. **API Push:** The UI formats the post with YAML frontmatter (exact ISO timestamps, tags, projects) and pushes it to the `public/posts/` directory via the GitHub API.
3. **Pipeline Trigger:** The commit triggers the GitHub Actions deployment workflow.
4. **Build & Deploy:** The workflow compiles the React app and pushes the optimized build to the `gh-pages` branch.
5. **Live Update:** The static site updates seamlessly with no database querying required on page load.

---

## 📝 Markdown Content Guide (The Digital Garden)

The blogging engine supports an interconnected "Zettelkasten" style knowledge base. 

**Rich Media Handling:**
* **Local Images:** Hosted in the `public/images/` directory and referenced via standard markdown: `![Alt Text](/portfolio/images/name.png)`
* **Ad-Free Video:** Supports Google Drive iframes with Tailwind injection for responsiveness:
  <iframe src="https://drive.google.com/file/d/YOUR_VIDEO_ID/preview" className="w-full aspect-video rounded-xl shadow-lg" allow="autoplay"></iframe>

**Cross-Linking & Deep Linking:**
* **Standard Link:** `[Website](https://example.com)`
* **Same-Page Anchor:** `[Jump to Architecture](#architecture)`
* **Cross-Blog Link:** `[Read EKS Setup](#/blog/gitops-cluster)`
* **Deep Cross-Blog Link:** `[See EKS Architecture](#/blog/gitops-cluster#architecture)`

---

## ⚙️ Local Development Setup

To run this project locally:

1. **Clone the repository:**
   git clone https://github.com/itspuru21/portfolio.git
   cd portfolio

2. **Install dependencies:**
   npm install

3. **Start the development server:**
   npm run dev

---

## 🔒 Managing Drafts (Feature Flags)

To work on a project without publishing it to the live site, simply add the `draft: true` flag to the object in `src/data/projects.json`. 

{
  "id": 1,
  "title": "Secret Upcoming Project",
  "draft": true,
  "techStack": ["React", "AWS"]
}

The React mapping function will automatically filter this out of the production UI until the flag is removed.

---

## 📬 Contact

* **GitHub:** [@itspuru21](https://github.com/itspuru21)
* **LinkedIn:** [Your LinkedIn Profile URL]
* **Email:** [Your Email Address]

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

> *"Infrastructure as Code, Content as Code."*