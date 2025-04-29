from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Listing(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    location = models.CharField(max_length=255, db_index=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    price_per_night = models.FloatField(validators=[MinValueValidator(0)])
    currency = models.CharField(max_length=10, default='USD')
    total_price = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    image_urls = models.JSONField(default=list, blank=True)
    ratings = models.FloatField(
        blank=True, 
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    description = models.TextField(blank=True, null=True)
    num_reviews = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(0)])
    amenities = models.JSONField(default=list, blank=True)
    host_info = models.JSONField(default=dict, blank=True)
    property_type = models.CharField(max_length=100, blank=True, null=True, db_index=True)
    check_in_date = models.DateField(blank=True, null=True)
    check_out_date = models.DateField(blank=True, null=True)
    num_guests = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        indexes = [
            models.Index(fields=['price_per_night']),
            models.Index(fields=['ratings']),
            models.Index(fields=['created_at']),
            models.Index(fields=['check_in_date']),
            models.Index(fields=['check_out_date']),
            models.Index(fields=['num_guests']),
        ]
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.location}"

    def save(self, *args, **kwargs):
        if not self.total_price and self.price_per_night:
            # Calculate total price based on check-in and check-out dates
            if self.check_in_date and self.check_out_date:
                days = (self.check_out_date - self.check_in_date).days
                self.total_price = self.price_per_night * days
            else:
                self.total_price = self.price_per_night * 30  # Default to monthly price
        super().save(*args, **kwargs)