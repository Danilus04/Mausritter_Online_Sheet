from django.urls import path
from .views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView, UserItemRetrieveUpdateDestroyAPIView, UserItemListCreateAPIView, LoginView, CharacterSheetRetrieveUpdateDestroyAPIView, UserCharacterSheetsView, CharacterSheetItemsListAPIView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('item/', ItemListCreateAPIView.as_view(), name='item-list-create'),         # /items/
    path('item/<int:pk>/', ItemRetrieveUpdateDestroyAPIView.as_view(), name='item-detail'),  # /items/1/
    
    # CRUD individual de item
    path('characters/items/<int:pk>/', UserItemRetrieveUpdateDestroyAPIView.as_view(), name='user-item-detail'),
    path('characters/items/', UserItemListCreateAPIView.as_view(), name='user-item-list-create'),
    # Itens de uma ficha específica
    path('characters/<int:character_id>/items/', CharacterSheetItemsListAPIView.as_view(), name='character-items'),
    
    path('login/', LoginView.as_view(), name='login'),

    # Endpoint especial: Listar fichas de um usuário
    path('user/characters/<int:user_id>', UserCharacterSheetsView.as_view(), name='user-character-sheets'),

    # Endpoint de detalhe / update / delete por ID da ficha
    path('characters/<int:pk>/', CharacterSheetRetrieveUpdateDestroyAPIView.as_view(), name='character-detail'),
    
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

