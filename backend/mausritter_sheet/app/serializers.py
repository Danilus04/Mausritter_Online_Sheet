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
        fields = ['id', 'username', 'email']

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "As senhas não conferem."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user