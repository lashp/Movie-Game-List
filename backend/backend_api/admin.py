from django.contrib import admin

from backend_api.models import Game, Movie

# Register your models here.

class MovieandGameAdmin(admin.ModelAdmin):
    movie_list = ('movie_name', 'movie_genre', 'movie_release_year', 'movie_collection')
    admin.site.register(Movie)

class GameAdmin(admin.ModelAdmin):
    game_list = ('game_name', 'game_genre', 'game_release_year', 'game_collection', 'game_system')
    admin.site.register(Game)