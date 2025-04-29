from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Listing
from .serializers import ListingSerializer

@api_view(['GET'])
def get_listings(request):
    # Add filters as query params
    filters = {}
    for field in ['location', 'property_type']:
        if request.GET.get(field):
            filters[field] = request.GET.get(field)
    if request.GET.get('min_price'):
        filters['price_per_night__gte'] = float(request.GET.get('min_price'))
    if request.GET.get('max_price'):
        filters['price_per_night__lte'] = float(request.GET.get('max_price'))
    listings = Listing.objects.filter(**filters)
    serializer = ListingSerializer(listings, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_listing(request):
    serializer = ListingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_listing(request, pk):
    try:
        listing = Listing.objects.get(pk=pk)
    except Listing.DoesNotExist:
        return Response({"error": "Listing not found"}, status=404)
    serializer = ListingSerializer(listing)
    return Response(serializer.data)