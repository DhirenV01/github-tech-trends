# HANDOFF.md - GitHub Tech Trends Dashboard

## Prompt Structure Reference (Ruben Hassid's 8-Part Anatomy)

When prompting Claude Code, structure your requests using these 8 components:

1. **Task Context** - Set the scene: who the AI is, where it will be used, the goal
2. **Tone Context** - Voice and tone for replies
3. **Background Data** - Link/attach sources, references to follow
4. **Interaction Rules** - Do/don't rules, edge cases, default replies
5. **Examples** - Sample Q&A or flows demonstrating desired style
6. **Conversation History** - Earlier messages for continuity
7. **Immediate Request** - Current question/task (clear and specific)
8. **Reasoning Instruction** - Ask for step-by-step thinking before answering

---

<task_context>
You are a senior data engineer helping Dhiren (a data engineer with 2+ years experience) deploy a portfolio project. The project demonstrates serverless ETL pipelines, medallion architecture, and AWS services. It will be shown to interviewers at financial services companies (JPMorgan, Morgan Stanley, Rockefeller Capital).
</task_context>

<tone_context>
Be direct and technical. Use terminology appropriate for data engineering interviews. Avoid over-explaining basics. Focus on production-ready code and deployment commands.
</tone_context>

<background_data>
Repository: https://github.com/DhirenV01/github-tech-trends

Project structure:
```
github-tech-trends/
├── frontend/
│   ├── data/                    # JSON data files
│   │   ├── primary-languages-weekly.json   # BUG: uses "languages" key
│   │   ├── primary-languages-monthly.json  # BUG: uses "languages" key
│   │   ├── repo-counts-*.json              # OK
│   │   └── repo-comparison-*.json          # OK
│   ├── js/
│   │   ├── api.js               # Fetches from data/*.json
│   │   ├── main.js              # Chart initialization
│   │   └── charts/
│   │       ├── languagesCountsChart.js  # Line 236: expects sample.counts
│   │       └── repoComparisonChart.js
│   ├── index.html
│   └── style.css
├── backend/
│   ├── extract/                 # Lambda: GitHub API → S3 raw
│   ├── aggregate/               # Lambda: S3 raw → S3 aggregated
│   └── api/                     # Lambda: FastAPI serving data
└── README.md
```

Key technical context:
- Charts use Chart.js
- Frontend expects specific data shapes (see chart files)
- Backend uses medallion architecture (raw → aggregated → served)
- Cost target: $0/month using AWS free tier
</background_data>

<interaction_rules>
- DO: Make file changes directly, run tests, commit when ready
- DO: Use git for version control and state tracking
- DO: Verify changes work before marking complete
- DON'T: Ask for permission on reversible local changes
- DON'T: Create unnecessary helper scripts
- EDGE CASE: If a file doesn't exist, check the path first
- DEFAULT: Commit with conventional commit messages (fix:, feat:, docs:)
</interaction_rules>

<examples>
Example 1 - Data format fix:
Input: "Fix the languages data format"
Action: Open primary-languages-weekly.json, find "languages":, replace with "counts":
Verification: Check languagesCountsChart.js line 236 expects "counts"
Commit: "fix: use 'counts' key in languages data files"

Example 2 - Deployment:
Input: "Deploy to Vercel"
Action: Ensure frontend/ has all files, push to GitHub, provide Vercel config
Output: Root directory = frontend, Framework = Other
</examples>

<conversation_history>
Previous session established:
- Cloned and rebranded simon-milata/data-tech-stats repo
- Rewrote git history to change author to Dhiren Vazirani
- Generated mock JSON data for charts
- First chart (repo counts) renders correctly
- Languages and comparison charts are empty due to data format mismatch
- Root cause identified: JSON files use "languages" but chart expects "counts"
</conversation_history>

---

## Immediate Request

<immediate_request>
Fix the data format issue in the frontend:

1. In `frontend/data/primary-languages-monthly.json`:
   - Find all instances of `"languages":` 
   - Replace with `"counts":`

2. In `frontend/data/primary-languages-weekly.json`:
   - Find all instances of `"languages":`
   - Replace with `"counts":`

3. Test locally:
   ```bash
   cd frontend
   python3 -m http.server 8080
   ```
   Open localhost:8080 - all three charts should render

4. Commit and push:
   ```bash
   git add .
   git commit -m "fix: use 'counts' key in languages data files for chart compatibility"
   git push
   ```
</immediate_request>

<reasoning_instruction>
Before making changes:
1. Verify the current state of the files
2. Confirm the exact string to find/replace
3. Make the changes
4. Verify the fix by checking the file contents
5. Run tests if possible
6. Commit with a clear message
</reasoning_instruction>

---

## Phase 2: Next Steps (After Fix)

Once static deployment works:

1. **Deploy frontend to Vercel**
   - Import repo from GitHub
   - Root directory: `frontend`
   - Framework: Other
   - Deploy

2. **Build real AWS backend** (Option B from planning)
   - Extract Lambda: Call GitHub Search API daily
   - Store raw JSON in S3 with date partitioning
   - Aggregate Lambda: Process into weekly/monthly summaries
   - API Lambda: FastAPI serving pre-aggregated data
   - EventBridge: Schedule daily extraction

3. **Update README** with:
   - Live demo link
   - Architecture diagram
   - Cost breakdown ($0/month on free tier)

---

## Key Files Reference

| File | Purpose | Status |
|------|---------|--------|
| `frontend/data/primary-languages-*.json` | Language distribution data | NEEDS FIX: "languages" → "counts" |
| `frontend/js/charts/languagesCountsChart.js` | Line 236 expects `sample.counts` | Reference only |
| `frontend/js/api.js` | Fetches from data/*.json | OK |
| `backend/extract/` | GitHub API extraction | Not deployed yet |
| `backend/aggregate/` | Data transformation | Not deployed yet |
| `backend/api/` | FastAPI endpoints | Not deployed yet |

---

## Owner Context

Dhiren is a Data Engineer actively interviewing at financial services firms. This project demonstrates:
- Serverless ETL pipelines (Lambda, EventBridge)
- Data engineering patterns (medallion architecture)
- Full-stack deployment (Vercel + AWS)
- Cost optimization ($0/month free tier)
- Production-ready code practices

The goal is a working portfolio piece that proves hands-on AWS and data engineering skills.
