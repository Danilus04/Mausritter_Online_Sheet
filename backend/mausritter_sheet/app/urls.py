from django.urls import path
from .views import (
    ItemListCreateAPIView,
    ItemRetrieveUpdateDestroyAPIView,
    UserItemRetrieveUpdateDestroyAPIView,
    UserItemListCreateAPIView,
    RegisterUserAPIView,
    CharacterSheetRetrieveUpdateDestroyAPIView,
    UserCharacterSheetsView,
    CharacterSheetItemsListAPIView
)
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('item/', ItemListCreateAPIView.as_view(), name='item-list-create'),         # /items/
    path('item/<int:pk>/', ItemRetrieveUpdateDestroyAPIView.as_view(), name='item-detail'),  # /items/1/
    
    # CRUD individual de item
    path('characters/items/<int:pk>/', UserItemRetrieveUpdateDestroyAPIView.as_view(), name='user-item-detail'),
    
    # Itens de uma ficha específica
    path('characters/items/', UserItemListCreateAPIView.as_view(), name='user-item-list-create'),
    
    #items de uma ficha específica
    path('characters/<int:character_id>/items/', CharacterSheetItemsListAPIView.as_view(), name='character-items'),
    
    path('register/', RegisterUserAPIView.as_view(), name='register_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Endpoint especial: Listar fichas de personagem de um usuário
    path('user/characters/<int:user_id>', UserCharacterSheetsView.as_view(), name='user-character-sheets'),

    # Endpoint de detalhe / update / delete por ID da ficha
    path('characters/<int:pk>/', CharacterSheetRetrieveUpdateDestroyAPIView.as_view(), name='character-detail'),
    
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

