from django.db import models

# Create your models here.
class Contacts(models.Model):
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    message = models.TextField()