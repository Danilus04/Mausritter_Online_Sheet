from django.contrib import admin
from django.urls import path, include

# 1. Importe estas duas linhas necessárias
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')),
]

# 2. Adicione este bloco de código no final do arquivo
# Ele serve os arquivos de mídia (uploads) quando você está em modo de desenvolvimento (DEBUG=True)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)