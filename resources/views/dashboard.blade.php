@extends('layouts.app')

@push('html-class') has-spinner-active has-aside-mobile-transition  @endpush

@push('head-scripts')
    <script>var exdata = {!! json_encode(array('pisbaseurl'=>env('PIS_SERVICE_BASE_URL2') )) !!};</script>
    <script src="{{ mix('js/dashboardapp.js') }}" defer></script>
@endpush


@push('bottom')
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
@endpush
