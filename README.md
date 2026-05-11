# ACCA Diagnostic MVP — Starter scaffold

What you get:
- REST API scaffold (Express + Sequelize + Postgres)
- Models: Patient, User, Visit
- Routes: /api/auth/login, /api/patients
- Docker compose for Postgres + app

Run locally:
1. Copy .env.example → .env and set values
2. docker-compose up --build
3. In another shell (after DB ready): docker exec -it <app_container> npm run migrate
4. Start server (if not running via compose): npm run dev
5. API: http://localhost:4000/api

Next steps to expand:
- Add tests, role-based middleware, migrations, swagger docs
- Implement sample/test/result/invoice models & controllers
- PDF report generator & storage (S3)
- Instrument integration & background workers (Bull/Redis)
