
# 📝 Todo Summary Assistant

A full-stack to-do application that allows users to manage tasks and summarize pending to-dos using a real LLM API, then send the summary to a Slack channel.

---

## 🚀 Features

- ✅ Create, edit, delete personal to-do items
- 📋 View current to-do list
- 🧠 Summarize all pending to-dos using a real LLM (OpenAI, Cohere, etc.)
- 📤 Post the generated summary to a Slack channel
- 📡 Hosted backend and database (Supabase/Firebase)
- 🔔 Success/failure notifications for Slack operations

---

## 🛠️ Tech Stack

### Frontend:
- **React** (UI)
- Axios (API communication)
- Tailwind CSS or Material UI (styling, optional)

### Backend:
- **Node.js + Express** *(or Spring Boot alternative)*
- PostgreSQL via **Supabase** *(or Firebase Firestore)*
- LLM Integration (e.g., **OpenAI**)
- Slack Webhook Integration

---

## 🧩 API Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/todos`         | Fetch all to-dos                 |
| POST   | `/todos`         | Add a new to-do                  |
| DELETE | `/todos/:id`     | Delete a to-do by ID             |
| POST   | `/summarize`     | Summarize todos & send to Slack  |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/todo-summary-assistant.git
cd todo-summary-assistant
```

### 2. Install Dependencies

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

---

### 3. Environment Variables

Create a `.env` file in both `frontend/` and `backend/` using `.env.example` as reference.

#### Example `.env` for Backend:
```env
OPENAI_API_KEY=your_openai_api_key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

---

### 4. Run Locally

#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend:
```bash
cd frontend
npm start
```

---

## 🤖 LLM Setup (OpenAI Example)

1. Create an account at [OpenAI](https://platform.openai.com/)
2. Get your API key from [API Keys page](https://platform.openai.com/account/api-keys)
3. Add it to your `.env` as `OPENAI_API_KEY`

---

## 💬 Slack Setup

1. Go to [Slack API Webhooks](https://api.slack.com/messaging/webhooks)
2. Create a new Incoming Webhook and select a channel
3. Copy the Webhook URL and paste into your `.env` as `SLACK_WEBHOOK_URL`

---

## 📐 Design & Architecture Decisions

- **Modular folder structure** separating frontend and backend
- **Axios** used for clean frontend-backend communication
- **LLM integration** uses `/summarize` endpoint to send the current to-do list, gets a response, and then pushes it to Slack
- **Supabase** chosen for free-tier PostgreSQL hosting and simplicity

---

## 🔗 Optional Deployment

- Frontend hosted on **Vercel/Netlify**
- Backend hosted on **Render/Fly.io**
- Example deployed URL (if available): [Live Demo](https://your-deployment-url.com)

---

## 📁 Project Structure

```
todo-summary-assistant/
│
├── frontend/         # React App
│   ├── src/
│   ├── public/
│   └── .env.example
│
├── backend/          # Node.js (Express)
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── .env.example
│
└── README.md
```

---

## 🧪 Future Enhancements

- ✅ Authentication via Firebase
- ✅ Task due dates and priorities
- ✅ Completed task summary
- ✅ Markdown support in Slack summary

---

## 📬 Contact

For any queries, reach out via [GitHub Issues](https://github.com/your-username/todo-summary-assistant/issues)

---

### © 2025 Todo Summary Assistant – Built with ❤️ during Full Stack Internship
