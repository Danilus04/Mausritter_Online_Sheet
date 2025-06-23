from rest_framework import serializers
from .models import Item, UserItem, User, CharacterSheet

class CharacterSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterSheet
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class UserItemSerializer(serializers.ModelSerializer):
    item_base = ItemSerializer(read_only=True)
    character_sheet = serializers.PrimaryKeyRelatedField(queryset=CharacterSheet.objects.all())

    class Meta:
        model = UserItem
        fields = [
            'id',
            'character_sheet',   # Agora vinculado à ficha
            'item_base',
            'quantity',
            'currentUsageSquare',
            'PositionX',
            'PositionY',
        ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['idUser', 'nameUser']