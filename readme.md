# InSync

# InSync.AI 🏡 – Family Household Manager

A role-based household assistant to help families coordinate meal planning, nutrition tracking, activity scheduling, and role-specific dashboards for parents, cooks, and drivers.

---

## 🚀 Features

| Role       | Features |
|------------|----------|
| 👩‍👩‍👧 **Parent** | - Weekly meal plan generator<br/>- Nutrition scanner from food image<br/>- Child activity planner<br/>- Real-time cook & driver notifications |
| 🍳 **Cook** | - Add kitchen notes for parents (e.g., “Buy kale”) |
| 🚗 **Driver** | - View child activities<br/>- Mark activities as accepted<br/>- Acceptance notifies parent |

---

## 🛠️ Tech Stack

- **Frontend:** React.js + react-router + react-icons
- **LLM & Vision API:** MonsterAPI (LLaMA, Gemma) via Python backend
- **Backend API:** Express.js + Python script runner
- **Styling:** Custom CSS with animated components
- **Data Store:** `localStorage` (no external DB)

---

## 🧩 Project Structure

inSync.ai/<br/>
├── code/<br/>
│ ├── server/ # Python + Node backend (MonsterAPI and image handling)<br/>
│ └── web/ # React frontend (UI for all dashboards)<br/>
└── README.md<br/>


---

## ⚙️ How to Run

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/inSync.ai.git
cd inSync.ai
```

### 2. Start the backend

```bash
cd code/server
npm install
# Create a .env file
echo "MONSTER_API_KEY=your_api_key_here" > .env
echo "OPENAI_API_KEY=your_api_key_here" > .env
# Run your backend
node index.js
```
This starts:

/generate-meal – LLM-powered meal planner

/analyze-image – Vision-based nutrition analyzer

### 3. Start the Frontend

```bash 
cd ../web
npm install
npm start
```
This starts the app at http://localhost:3000

# 🔐 API Keys
Add your MonsterAPI key to code/server/.env:

ini
Copy
Edit
MONSTER_API_KEY=sk-xxxxxx
Do not commit this key. Use .env.example as reference.