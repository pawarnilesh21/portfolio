# Role gap analysis

Updated: 2026-10-25. This rubric controls emphasis; it does not add unearned skills.

## SDE-1

**Evidence:** TechSonix REST API/JWT/RBAC internship; Investify planning/backend work; DocMind ownership isolation, durable jobs and transactions; ResolveDesk replay-safe approvals. HMS contributes frontend workflow modeling only. Internship bullets are resume-supported, not independently employer-verified.

**Thin:** current public Investify code differs from newer local code; no verified production throughput/users; no dated load benchmark or consistent CI result for the deployed release. DSA and CS fundamentals are resume-listed, without checked problem counts or coursework artifacts. No distributed-system expertise inferred from basic app architecture.

**Highest-value improvements:**
1. Reconcile and publish the actual Investify version with architecture, auth/session design, test commands and an honest read-only demo. Remove unsupported deployed marketing numbers in a separately authorized project update.
2. Run a reproducible isolated test/load scenario for its planning API, record dataset/concurrency/p50/p95/error rate and commit SHA. Publish actual results, not targets.
3. Document one concrete transaction/concurrency decision and failure/recovery test; align README, resume and source. Clarify HMS prototype scope rather than adding an unverified backend claim.

## AI Engineer

**Evidence:** DocMind demonstrates Python/FastAPI, embeddings, owner-filtered vector retrieval, grounding checks, ingestion lifecycle and dated backend/browser verification. ResolveDesk and StudyForge add AI application development. These prove applied AI engineering, not training custom ML models.

**Thin:** no supplied training dataset, baseline/ablation, PyTorch/TensorFlow model-training artifact, experiment tracking results, or model-serving benchmark. Do not list those technologies merely because the role rubric mentions them. DocMind's synthetic provider smoke is not a statistically meaningful answer-quality evaluation.

**Highest-value improvements:**
1. Evaluate DocMind on a fixed consented/synthetic document set with questions, expected sources, unanswerable cases and a retrieval-only baseline. Report retrieval/citation correctness, abstention and failure categories.
2. Record latency/cost across document lengths with provider/model/version, run date and sample size. Separate measured results from unit-test coverage.
3. Repair StudyForge clean-clone setup/export paths and add format/content checks; compare prompt versions on the same topics before claiming improvement.

## GenAI Engineer

**Evidence:** public DocMind RAG/citations/entailment checks; ResolveDesk's local LangGraph tool loop, explicit human approval, checkpoints and idempotent simulated actions; AI Blog Generator's authenticated Gemini draft integration. The requested AI resume is used for this role too.

**Thin:** ResolveDesk evaluation code exists but the phase tracker says live LangSmith handoff is unfinished. Blog generator has a simple prompt request, not verified streaming, structured output, cost instrumentation, retries or rate limiting. No measured end-to-end faithfulness or prompt-injection evaluation supplied. Do not imply fine-tuning/LoRA, vLLM, hybrid retrieval or reranking.

**Highest-value improvements:**
1. Finish ResolveDesk's existing evaluation scenarios (wrong tool, wrong owner, approval bypass, duplicate decision and provider failure); publish actual trace links and pass/fail cases with the model version.
2. Add a representative DocMind failure/grounding evaluation with misleading source text and unsupported questions; report abstention trade-offs rather than “hallucination-free.”
3. Add bounded inputs, generation rate limits, failure handling and a small reproducible draft-quality evaluation to AI Blog Generator. Record actual per-request latency/cost if available.

## AI-project selection

1. **DocMind: featured.** Most inspectable public evidence: code, README, test files, operational limits and historical reports. Prefer current pgvector architecture; flag older ChromaDB resume version.
2. **ResolveDesk: featured, code-only/local-review caveat.** Strong workflow/recovery implementation, but public repository and completed evaluation missing. Keep simulated-payments limitation visible.
3. **StudyForge: additional work.** Real four-format generation code, but simpler depth and clean-clone issues. No deployment/evaluation claims until verified.

SyncBoard remains a candidate, not silently inserted into the fixed project priorities. ECO-BIN/Dining Master remain earlier work.

## Skill evidence policy

The typed content layer unions the supplied resume skills, normalizes aliases and attaches roles. It does not add rubric technologies. Demonstrated skills link to project/internship IDs. The “shipped project” enum denotes implemented code, including code-only local projects; status is separate and never implies public hosting. Resume-listed skills without reviewed evidence are Familiar. No percentage bars, invented years of experience, inflated problem counts or logos in lieu of proof.

All requested missing facts and version decisions are collected in CONTENT_TODO.md. Project improvements above are recommendations; this portfolio task does not change those repositories or claim the recommendations are complete.

