from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ItemSerializer, UserItemSerializer, UserRegisterSerializer, CharacterSheetSerializer
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from .models import Item, UserItem, CharacterSheet
from rest_framework.permissions import IsAuthenticated

# Endpoint: GET /items/, POST /items/
class ItemListCreateAPIView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# Endpoint: GET /items/<id>/, PUT /items/<id>/, DELETE /items/<id>/
class ItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class UserItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserItem.objects.all()
    serializer_class = UserItemSerializer

class UserItemListCreateAPIView(generics.ListCreateAPIView):
    queryset = UserItem.objects.all()
    serializer_class = UserItemSerializer

class CharacterSheetItemsListAPIView(generics.ListAPIView):
    serializer_class = UserItemSerializer

    def get_queryset(self):
        character_id = self.kwargs['character_id']
        return UserItem.objects.filter(character_sheet__id=character_id)
    
class CharacterSheetRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CharacterSheet.objects.all()
    serializer_class = CharacterSheetSerializer

class UserCharacterSheetsView(generics.ListAPIView):
    serializer_class = CharacterSheetSerializer
    permission_classes = [IsAuthenticated]  # Garante que só usuários autenticados acessem

    def get_queryset(self):
        return CharacterSheet.objects.filter(user=self.request.user)

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