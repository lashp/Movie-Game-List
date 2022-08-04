
from django.shortcuts import render
from .models import Game, Movie
from .serializers import GameSerializer, MovieSerializer
from rest_framework import viewsets
# Create your views here.

class MovieViewSet(viewsets.ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()

class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()