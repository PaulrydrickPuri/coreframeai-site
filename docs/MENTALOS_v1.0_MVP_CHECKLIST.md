
# ✅ MENTALOS v1.0 MVP CHECKLIST (CoreframeAI)

---

## 📦 1. Core Experience (Terminal + Mode Switching)
- [x] Terminal-like interface for user interaction  
- [x] Mode Switcher UI (`Builder`, `Creator`, `Learner`, `Focus`)  
- [x] Confirmation interaction (`> confirm ✅`)  
- [x] Feedback: “Booting into X mindset…”  
- [ ] System greeting with emotional warmth and tone consistency

---

## 🧠 2. Mental Modules Engine
- [ ] Define modules:  
  - Cognitive Kernel  
  - Priority Scheduler  
  - Context Memory  
  - Feedback Monitor  
  - Distraction Firewall  
  - Identity Bootloader  
- [ ] Save/load current config per user mode  
- [ ] JSON structure to persist module state

---

## 📝 3. Journal + Reflection System
- [ ] Daily journaling input via terminal (`--journal`)  
- [ ] Weekly reflection summary (`--weekly-update`)  
- [ ] Exportable markdown or plain-text log  
- [ ] Internal command routing system (`--debug`, `--quote`, `--log`)

---

## 🔐 4. Auth + Persistence Layer
- [x] ✅ Supabase selected as database & auth provider  
- [ ] Set up Supabase project  
- [ ] Enable auth (email/password or OAuth)  
- [ ] Define tables:
  - `users`
  - `mental_configs`
  - `journals`
  - `mode_switch_logs`  
- [ ] Secure CRUD API endpoints  
- [ ] Link user profiles to stored MentalOS state

---

## 🎛️ 5. Dashboard & UX Polish
- [ ] Dashboard to view current mode & config  
- [ ] Show recent journal activity  
- [ ] Mode-switch logs with simple timeline view  
- [ ] Minimal metrics (days active, mode streaks, etc.)  
- [ ] “mentalOSv1@CoreframeAI” visible branding in footer & terminal

---

## 💬 6. Optional GPT Integration
- [ ] Integrate GPT for mode-guided assistance  
- [ ] Dynamic GPT behavior per mode (e.g., Builder = execution prompts)  
- [ ] Use GPT to auto-summarize journal logs and suggest new configs  
- [ ] RAG or memory system for personalized suggestions (phase 2+)
