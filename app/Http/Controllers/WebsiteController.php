<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\AwardScheme;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\AwardWinner;

class WebsiteController extends Controller
{
    /**
     * Display the homepage.
     */
    public function index()
    {
        return Inertia::render('website/Home');
    }
}

