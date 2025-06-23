from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .serializers import ItemSerializer, UserItemSerializer, UserSerializer
from django.contrib.auth.hashers import check_password
from .models import Item, UserItem, User

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

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = User.objects.get(nameUser=username)
            # Se as senhas estiverem em texto puro, use:
            if user.passwordUser == password:
                return Response({'message': 'Login successful', 'user_id': user.idUser})
            # Se usar hash, troque por:
            # if check_password(password, user.passwordUser):
            #     return Response({'message': 'Login successful', 'user_id': user.idUser})
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)