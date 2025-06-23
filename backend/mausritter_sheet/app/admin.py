from django.contrib import admin
from .models import Item, UserItem, User
# Register your models here.
admin.site.register(Item)
admin.site.register(UserItem)
admin.site.register(User)
