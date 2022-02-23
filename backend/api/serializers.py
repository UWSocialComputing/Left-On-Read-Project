from rest_framework import serializers
import json

from .models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('user_name', 'alias', 'avatar')


class UserStatusSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        user = instance.user
        return {
            'user_name': user.user_name,
            'alias': user.alias,
            'current_tab': instance.current_tab,
            'keyboard_activity': json.loads(instance.keyboard_activity)
        }