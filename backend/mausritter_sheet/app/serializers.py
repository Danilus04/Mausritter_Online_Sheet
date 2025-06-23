from rest_framework import serializers
from .models import Item, UserItem, User

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class UserItemSerializer(serializers.ModelSerializer):
    item_base = ItemSerializer(read_only=True)  # Inclui os detalhes do Item base

    class Meta:
        model = UserItem 
        fields = ['id', 'item_base', 'quantity', 'currentUsageSquare', 'id', 'item_base', 'PositionX', 'PositionY', 'user']  # Adicione outros campos conforme necessário
        #read_only_fields = ['id', 'item_base']  # Se não quiser que esses campos sejam editáveis

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['idUser', 'nameUser']