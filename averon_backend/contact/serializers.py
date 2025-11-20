from rest_framework import serializers
from .models import Contacts


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = ['id', 'email', 'name', 'message']
        read_only_fields = ['id']
