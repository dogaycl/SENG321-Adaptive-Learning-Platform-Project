# content/services.py

class ContentService:
    def upload_content(self, data):
        """Processes the instructor's input and creates a new content (UC11)."""
        print(f"Uploading content: {data['title']}...")
        # Simulating a successful upload
        return True

    def retire_content(self, content_id):
        """Removes a content from active view (UC11)."""
        print(f"Content with ID {content_id} has been retired.")
        return True