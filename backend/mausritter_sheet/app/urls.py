from django.urls import path
from .views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView, UserItemRetrieveUpdateDestroyAPIView, UserItemListCreateAPIView, RegisterUserAPIView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('item/', ItemListCreateAPIView.as_view(), name='item-list-create'),         # /items/
    path('item/<int:pk>/', ItemRetrieveUpdateDestroyAPIView.as_view(), name='item-detail'),  # /items/1/
    path('user/items/<int:pk>/', UserItemRetrieveUpdateDestroyAPIView.as_view(), name='user-item-list-create'),  # /user/items/
    path('user/items/', UserItemListCreateAPIView.as_view(), name='user-item-detail'),  # /user/items/1/
    path('register/', RegisterUserAPIView.as_view(), name='register_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

