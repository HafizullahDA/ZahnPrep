from pydantic import BaseModel, Field
from typing import List

class GeneratedQuestion(BaseModel):
    question_text: str = Field(description="The heavily formatted question text based on the syllabus trap structure.")
    options: List[str] = Field(..., description="An array of exactly 4 string distractors.")
    correct_answer_index: int = Field(..., description="The zero-based index of the correct answer in the options array. Critical for UI styling.")
    explanation: str = Field(..., description="Immediate, factual breakdown or grueling markdown explanation depending on the exam type.")
    difficulty: str = Field(description="e.g., 'hard', 'medium', 'grueling'")
    format_type: str = Field(description="e.g., 'pairs_matching', 'direct_fact', 'assertion_reasoning'")

class GeneratedAssessment(BaseModel):
    questions: List[GeneratedQuestion] = Field(description="The final payload of generated MCQs.")

class GenerateRequest(BaseModel):
    exam_paper_type: str = Field(..., description="The identifier (e.g., UPSC_GS_PAPER_1).")
    context_text: str = Field(..., description="The extracted markdown text from the user's document upload.")
    mcq_count: int = Field(10, description="Number of questions to generate.")
