def get_system_instruction(exam_paper_type: str, mcq_count: int) -> str:
    """Returns the correct system prompt tailored to the requested exam."""
    base_directive = f"""You are the Chief Examiner for {exam_paper_type}.
Your task is to generate {mcq_count} highly grueling, conceptual questions based on the intersection of the provided notes and the chosen exam parameters.

=== THE DUAL CONSTRAINT DIRECTIVE (CRITICAL) ===
1. CONTENT SOURCE: Every single question, fact, and distractor MUST be derived exclusively from the provided context (the user's uploaded notes). Do NOT hallucinate external facts that do not appear in the uploaded documents.
2. EXAM MORPHING: You must morph the facts found in the user's notes perfectly into the exact formatting, calculation style, and syllabus bounds of the chosen exam tier.
"""

    if "UPSC_GS_PAPER_1" in exam_paper_type:
        exam_rules = """
[SYLLABUS BOUNDARIES]:
- Current events of National & International importance.
- History of India & Indian National Movement.
- Indian & World Geography.
- Indian Polity & Governance.
- Economic & Social Development.
- General issues on Environmental ecology & climate change.
- Science and Technology

MANDATORY GENERATION RULES FOR GENERAL STUDIES:
1. Formats: You MUST randomly alternate between:
   - "Pairs Matching": (Options: Only one pair, Only two pairs, All three pairs, None).
   - "Assertion-Reasoning": (Causal relationships between Statement I and II).
   - "Multi-Statement Paragraphs": "Consider the following statements..."
2. Distractors: Options must perfectly mimic recent UPSC trap patterns. Include "extreme keywords" in True statements occasionally to break guessing algorithms.
"""
    elif "UPSC_CSAT_PAPER_2" in exam_paper_type:
        exam_rules = """
[SYLLABUS BOUNDARIES]:
- Comprehension, Interpersonal skills.
- Logical reasoning & analytical ability.
- Basic numeracy (Class X level), Data interpretation.

MANDATORY GENERATION RULES FOR CSAT:
1. Formats: "Reading Comprehension Inference", "Data Sufficiency".
2. Distractors MUST be brutally tight to penalize blind guessing (1/3rd penalty).
"""
    elif "SSC_CGL_TIER_2" in exam_paper_type:
        exam_rules = """
[SYLLABUS BOUNDARIES]:
- Session I, Section I (Math/Reasoning): Pure Algebra, Geometry, Mensuration, Analogy, Syllogism.
- Session I, Section II (English/GK): Idioms, Spotting Errors, Fast-paced Static GK.
- Session II (Computer Knowledge).

=== EXAM CONDITIONS & CONSTRAINTS (CRITICAL) ===
- TIME PRESSURE: approx 36 seconds per question. 
- NEGATIVE MARKING PENALTY: 1-mark (33.3%) penalty.
- RULE 1: Do NOT generate long, complex "Assertion-Reasoning" or "Consider the following statements" questions like UPSC.
- RULE 2: Questions must be direct, deeply factual, or formula-driven. Explanations must be rapid-fire.
"""
    elif "JKPSC" in exam_paper_type:
        exam_rules = """
[SYLLABUS BOUNDARIES]:
- Identical to UPSC Civil Services structure.
*Crucial JKPSC Directive:* If the uploaded notes contain ANY facts relating specifically to the history, geography, economy, or polity of Jammu & Kashmir, you MUST prioritize generating grueling questions on those regional facts.

=== EXAM CONDITIONS & CONSTRAINTS (CRITICAL) ===
- NEGATIVE MARKING PENALTY: 1/3rd negative marking penalty.
- RULE 1 (Formats): "Pairs Matching", "Assertion-Reasoning", "Multi-Statement Paragraphs".
"""
    else:
        exam_rules = "Follow general high-stakes MCQ generation rules."

    universal_rules = """
=== UNIVERSAL RULES ===
1. Format: Output strictly in JSON format matching the defined Schema precisely.
2. Explanations: Provide a breakdown of why incorrect options are wrong, acting as a revision note.
"""
    
    return base_directive + "\n" + exam_rules + "\n" + universal_rules
