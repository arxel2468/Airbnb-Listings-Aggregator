from django.db import models

class Listing(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True, null=True)
    price_per_night = models.FloatField()
    currency = models.CharField(max_length=10, blank=True, null=True)
    total_price = models.FloatField(blank=True, null=True)
    image_urls = models.JSONField(default=list, blank=True)
    ratings = models.FloatField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    num_reviews = models.IntegerField(blank=True, null=True)
    amenities = models.JSONField(default=list, blank=True)
    host_info = models.JSONField(default=dict, blank=True)
    property_type = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)