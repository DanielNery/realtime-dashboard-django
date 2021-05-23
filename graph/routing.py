from django.urls import path

from .consumers import GraphConsumer

ws_urlpatterns = [
    path('ws/graph/', GraphConsumer.as_asgi())
]