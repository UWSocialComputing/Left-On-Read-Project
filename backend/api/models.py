from distutils.command.upload import upload
from tabnanny import verbose
from django.db import models

# Create your models here.


class User(models.Model):
    user_name = models.CharField(max_length=32, primary_key=True)
    alias = models.CharField(max_length=64)
    avatar = models.ImageField(upload_to='avatars')

    def __str__(self):
        return self.user_name


class Status(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    current_tab = models.CharField(max_length=64, null=True, blank=True)
    keyboard_activity = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Statuses'


class Preferences(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    show_current_tab = models.BooleanField(default=True)
    show_keyboard_activity = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'PreferencesTable'
