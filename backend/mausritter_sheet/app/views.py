from rest_framework import generics
from .models import Item, UserItem
from .serializers import ItemSerializer, UserItemSerializer

# Endpoint: GET /items/, POST /items/
class ItemListCreateAPIView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# Endpoint: GET /items/<id>/, PUT /items/<id>/, DELETE /items/<id>/
class ItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# Endpoint: GET /user/items/<id>/, POST /user/items/<id>/, DELETE /user/items/<id>/
class UserItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserItem.objects.all()  # Aqui você deve usar o modelo correto para UserItem
    serializer_class = UserItemSerializer  # Use o serializer correto para UserItem

    #def get_queryset(self):
    #    user = self.request.user
    #    return UserItem.objects.filter(user=user)  # Filtra os itens do usuário autenticado

class UserItemListCreateAPIView(generics.ListCreateAPIView):
    queryset = UserItem.objects.all()
    serializer_class = UserItemSerializer