# content/repository.py

class ContentRepository:
    def __init__(self):
        # A simple dictionary to simulate a database
        self.contents = {}

    def save(self, content_obj):
        """Saves or updates content in the database."""
        self.contents[content_obj.title] = content_obj
        print(f"Repository: Saved {content_obj.title} to database.")
        return True

    def find_by_title(self, title):
        """Finds content by its title."""
        return self.contents.get(title)

    def delete(self, title):
        """Removes content from database."""
        if title in self.contents:
            del self.contents[title]
            return True
        return False