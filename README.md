# Habitus

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/LuloDev/habitus/actions)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-000000?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![ElysiaJS](https://img.shields.io/badge/ElysiaJS-404040?style=for-the-badge&logo=elysia&logoColor=white)](https://elysiajs.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Habitus is a powerful and intuitive habit tracking application designed to help you build and maintain positive routines. With a clean interface and robust features, Habitus makes it easy to monitor your progress and stay motivated on your journey to self-improvement.

## ✨ Features

- **Intuitive Habit Tracking**: Easily create, manage, and track your daily habits.
- **Detailed Progress View**: Visualize your habit streaks and completion rates over time.
- **CRUD Operations**: Full control over your habits and their instances (daily entries).
- **Home Assistant Integration**: Seamlessly synchronize your habits with Home Assistant for automated tracking and advanced automations.

## 🚀 Technologies Used

- **Frontend**: SvelteKit, TypeScript
- **Styling**: CSS (custom)
- **Database**: SQLite (via Drizzle ORM)
- **ORM**: Drizzle ORM
- **Testing**: Playwright (for End-to-End tests)
- **Package Manager**: Bun

## 📦 Getting Started

### Local Development

To get a local copy up and running, follow these simple steps.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LuloDev/habitus.git
   cd habitus
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory based on `.env.example`.

   ```
   # Database file name (required)
   DB_FILE_NAME="./data/mydb.db"

   # Optional: Home Assistant Integration
   # HOME_ASSISTANT_URL="http://homeassistant.local:8123"
   # HOME_ASSISTANT_TOKEN="YOUR_LONG_LIVED_ACCESS_TOKEN"
   ```

4. **Run database migrations:**

   ```bash
   bun --bun run migrate
   ```

5. **Start the development server:**

   ```bash
   bun --bun run dev
   ```

   The application will be accessible at `http://localhost:5173`.

### Docker Deployment

You can easily deploy Habitus using Docker Compose.

1. **Create a `docker-compose.yml` file:**

   ```yaml
   services:
     habitus:
       image: ghcr.io/lulodev/habitus:latest
       restart: unless-stopped
       ports:
         - 3000:3000
       environment:
         - DB_FILE_NAME=${DB_FILE_NAME:-./data/mydb.db} # Optional
         - HOME_ASSISTANT_URL=${HOME_ASSISTANT_URL} #Optional
         - HOME_ASSISTANT_TOKEN=${HOME_ASSISTANT_TOKEN} #Optional
       volumes:
         - data-habits:/usr/src/app/data
   networks: {}
   volumes:
     data-habits: null
   ```

2. **Environment Variables for Docker:**
   - `DB_FILE_NAME`: **Optional**. Specifies the path and name of the SQLite database file within the container. It's recommended to mount a volume to persist this data. Default value is `./data/mydb.db`.
   - `HOME_ASSISTANT_URL`: Optional. The URL of your Home Assistant instance (e.g., `http://homeassistant.local:8123`).
   - `HOME_ASSISTANT_TOKEN`: Optional. A long-lived access token for your Home Assistant instance.

3. **Run Docker Compose:**

   ```bash
   docker compose up -d
   ```

   The application will be accessible at `http://localhost:3000`.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

