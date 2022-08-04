from django.db import models

# Create your models here.
class Movie(models.Model):
    movie_name = models.CharField(max_length=250)
    movie_genre = models.CharField(max_length=200)
    movie_release_year = models.CharField(max_length=4, default=None)
    movie_collection = models.CharField(max_length=350)
    
    def __str__(self):
        return self.movie_name


class Game(models.Model):
    game_name = models.CharField(max_length=250)
    game_genre = models.CharField(max_length=200)
    game_release_year = models.CharField(max_length=4, default=None)
    game_collection = models.CharField(max_length=350)
    game_system = models.CharField(max_length=250, default=None)
    
    def __str__(self):
        return self.game_name

   