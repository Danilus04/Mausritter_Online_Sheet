from django.contrib import admin
from django.urls import path, include  # importando include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('items/', include('app.urls')),  # ajustando para o nome do seu app 'app'
]
