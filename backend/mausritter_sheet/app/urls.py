from django.urls import path
from .views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView, UserItemRetrieveUpdateDestroyAPIView, UserItemListCreateAPIView

urlpatterns = [
    path('item/', ItemListCreateAPIView.as_view(), name='item-list-create'),         # /items/
    path('item/<int:pk>/', ItemRetrieveUpdateDestroyAPIView.as_view(), name='item-detail'),  # /items/1/
    path('user/items/<int:pk>/', UserItemRetrieveUpdateDestroyAPIView.as_view(), name='user-item-list-create'),  # /user/items/
    path('user/items/', UserItemListCreateAPIView.as_view(), name='user-item-detail'),  # /user/items/1/
]

