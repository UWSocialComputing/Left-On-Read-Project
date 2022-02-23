from django.contrib import admin
from .models import User, Status, Preferences
# Register your models here.
admin.site.register(User)
admin.site.register(Status)
admin.site.register(Preferences)