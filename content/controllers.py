# content/controllers.py
from services import ContentService

class ContentController:
    def __init__(self):
        # Initializing the service we just updated
        self.service = ContentService()

    def handle_upload_request(self, request_data):
        """
        UC11: Receives the upload request from Instructor UI.
        Connects the UI to the Logic (Service).
        """
        print("Controller: Received upload request.")
        
        # Calling the upload logic in services.py
        result = self.service.upload_content(request_data)
        
        if result["status"] == "success":
            print(f"Controller: Upload successful with tags: {result['tags']}")
            return "Success: Content uploaded and tagged." # 'showConfirmation' in diagram
        else:
            print(f"Controller Error: {result['message']}")
            return f"Error: {result['message']}" # 'showErrorMessage' in diagram

    def handle_retire_request(self, content_id):
        """UC11: Handles removing content from active view."""
        self.service.retire_content(content_id)
        return f"Content {content_id} retired successfully."