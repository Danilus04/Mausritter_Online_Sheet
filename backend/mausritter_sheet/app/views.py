from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ItemSerializer, UserItemSerializer, UserSerializer, UserRegisterSerializer
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from .models import Item, UserItem

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

class RegisterUserAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'message': 'Usuário registrado com sucesso.'
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
