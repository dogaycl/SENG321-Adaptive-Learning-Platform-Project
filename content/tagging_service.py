# content/tagging_service.py

class TaggingService:
    @staticmethod
    def generate_detailed_tags(title, description):
        """
        UC12: Automatically generates Topic, Outcome, and Difficulty.
        Essential for AI Recommendation (UC5).
        """
        # Default values based on Class Diagram
        metadata = {
            "topic": "General Education",
            "outcome": "Knowledge Mastery",
            "difficulty": 3 # Neutral starting point (FR7)
        }

        # Logic to extract metadata (Simplified for now)
        if "python" in title.lower() or "code" in title.lower():
            metadata["topic"] = "Computer Science"
            metadata["outcome"] = "Programming Proficiency"
        
        # FR11: Handling scientific/math notation
        if "math" in title.lower() or "formula" in title.lower():
            metadata["topic"] = "Mathematics"
            metadata["outcome"] = "Analytical Reasoning"

        return metadata