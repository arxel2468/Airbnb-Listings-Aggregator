from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'id',
            'title',
            'location',
            'address',
            'price_per_night',
            'currency',
            'total_price',
            'image_urls',
            'ratings',
            'description',
            'num_reviews',
            'amenities',
            'host_info',
            'property_type',
            'created_at',
            'updated_at',
            'is_active'
        ]
        read_only_fields = ['created_at', 'updated_at', 'id']

    def validate(self, data):
        # Ensure price_per_night is positive
        if 'price_per_night' in data and data['price_per_night'] < 0:
            raise serializers.ValidationError("Price per night must be positive")
        
        # Ensure ratings are between 0 and 5
        if 'ratings' in data and (data['ratings'] < 0 or data['ratings'] > 5):
            raise serializers.ValidationError("Ratings must be between 0 and 5")
        
        # Ensure num_reviews is positive
        if 'num_reviews' in data and data['num_reviews'] < 0:
            raise serializers.ValidationError("Number of reviews must be positive")
        
        return data