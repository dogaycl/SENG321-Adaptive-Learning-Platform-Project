# content/models.py

class DersIcerigi:
    def __init__(self, baslik, tur, zorluk):
        self.baslik = baslik     # Dersin adı
        self.tur = tur           # Video mu, yazı mı? (FR10)
        self.zorluk = zorluk     # 1'den 5'e kadar zorluk (FR7)
        self.aktif_mi = True     # Yayında mı?