# content/models.py updated

class Content:
    def __init__(self, title, content_type, instructor_id, metadata):
        self.title = title
        self.content_type = content_type
        self.instructor_id = instructor_id # Assigned Instructor
        
        # Detailed Tagging (UC12)
        self.topic = metadata.get("topic")
        self.outcome = metadata.get("outcome")
        self.difficulty = metadata.get("difficulty") # FR7
        
        self.is_active = True
        