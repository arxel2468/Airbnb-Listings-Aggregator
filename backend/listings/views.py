from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from .models import Listing
from .serializers import ListingSerializer
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
def get_listings(request):
    try:
        # Build filters
        filters = Q(is_active=True)
        
        # Text search
        search_query = request.GET.get('search')
        if search_query:
            filters &= Q(
                Q(title__icontains=search_query) |
                Q(location__icontains=search_query) |
                Q(description__icontains=search_query)
            )

        # Location search - case insensitive contains
        location = request.GET.get('location')
        if location:
            filters &= Q(location__icontains=location)

        # Property type
        property_type = request.GET.get('property_type')
        if property_type:
            filters &= Q(property_type=property_type)

        # Price range
        min_price = request.GET.get('min_price')
        max_price = request.GET.get('max_price')
        if min_price:
            try:
                filters &= Q(price_per_night__gte=float(min_price))
            except ValueError:
                logger.warning(f"Invalid min_price value: {min_price}")
        if max_price:
            try:
                filters &= Q(price_per_night__lte=float(max_price))
            except ValueError:
                logger.warning(f"Invalid max_price value: {max_price}")

        # Rating filter
        min_rating = request.GET.get('min_rating')
        if min_rating:
            try:
                filters &= Q(ratings__gte=float(min_rating))
            except ValueError:
                logger.warning(f"Invalid min_rating value: {min_rating}")
        
        # Check-in and check-out dates
        check_in = request.GET.get('check_in_date')
        check_out = request.GET.get('check_out_date')
        
        if check_in and check_out:
            try:
                # Parse dates
                check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
                check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
                
                # Filter by availability
                filters &= Q(check_in_date__lte=check_in_date) | Q(check_in_date__isnull=True)
                filters &= Q(check_out_date__gte=check_out_date) | Q(check_out_date__isnull=True)
            except ValueError:
                logger.warning(f"Invalid date format: {check_in} or {check_out}")
        
        # Number of guests
        num_guests = request.GET.get('num_guests')
        if num_guests:
            try:
                filters &= Q(num_guests__gte=int(num_guests)) | Q(num_guests__isnull=True)
            except ValueError:
                logger.warning(f"Invalid guests value: {num_guests}")

        # Get queryset
        listings = Listing.objects.filter(filters)

        # Pagination
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(listings, request)
        
        # Serialize
        serializer = ListingSerializer(result_page, many=True)
        
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        logger.error(f"Error in get_listings: {str(e)}")
        return Response(
            {"error": "An error occurred while fetching listings"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_listing(request, pk):
    try:
        listing = Listing.objects.get(pk=pk, is_active=True)
        serializer = ListingSerializer(listing)
        return Response(serializer.data)
    except Listing.DoesNotExist:
        return Response(
            {"error": "Listing not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error in get_listing: {str(e)}")
        return Response(
            {"error": "An error occurred while fetching the listing"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def add_listing(request):
    try:
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error in add_listing: {str(e)}")
        return Response(
            {"error": "An error occurred while adding the listing"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )