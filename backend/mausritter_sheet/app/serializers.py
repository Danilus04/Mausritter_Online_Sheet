from rest_framework import serializers
from .models import Item, UserItem
from django.contrib.auth.models import User

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