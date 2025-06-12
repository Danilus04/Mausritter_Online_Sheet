from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer

# Endpoint: GET /items/, POST /items/
class ItemListCreateAPIView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# Endpoint: GET /items/<id>/, PUT /items/<id>/, DELETE /items/<id>/
class ItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
