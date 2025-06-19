from django.urls import path
from .views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', ItemListCreateAPIView.as_view(), name='item-list-create'),         # /items/
    path('<int:pk>/', ItemRetrieveUpdateDestroyAPIView.as_view(), name='item-detail'),  # /items/1/
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
