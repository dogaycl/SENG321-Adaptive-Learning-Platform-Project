# content/services.py

class ContentService:
    def __init__(self):
        # Desteklenen formatlar (FR10 gereksinimi)
        self.allowed_formats = ['video', 'text', 'simulation']

    def validate_file(self, content_type):
        """Checks if the file format is supported (UC11 Validation)."""
        if content_type not in self.allowed_formats:
            print("Error: Unsupported file format!") # Sequence diagram'daki hata mesajı
            return False
        return True

    def upload_content(self, data):
        """Processes the instructor's input and triggers tagging."""
        if not self.validate_file(data['content_type']):
            return {"status": "error", "message": "Invalid format"}
        
        print(f"Uploading content: {data['title']}...")
        # UC11: Automatically suggests tags based on title
        suggested_tags = self.suggest_tags(data['title'])
        return {"status": "success", "tags": suggested_tags}

    def suggest_tags(self, title):
        """Simple tagging logic for UC12."""
        tags = ["educational"]
        if "python" in title.lower(): tags.append("coding")
        if "math" in title.lower(): tags.append("notation") # FR11 uyumu için
        return tags
    def edit_content(self, title, new_difficulty):
        """
        Updates the difficulty of an existing content (UC11 Edit).
        Necessary for AI to adjust learning paths (FR7).
        """
        print(f"Editing content: {title}...")
        # In a real app, we would update the database here
        return {"status": "updated", "new_difficulty": new_difficulty}