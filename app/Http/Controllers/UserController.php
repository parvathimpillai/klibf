<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\User\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return all users paqginated with 10 users per page
        return Inertia::render(
            'Users/Index',
            [
                'users' => UserResource::collection(User::paginate(10)),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // return the user with the specified id
        return Inertia::render(
            'Users/Edit',
            [
                'user' => new UserResource(User::find($id)),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        // update the user with the specified id
        $user = User::find($id);
        $user->update($request->all());
        // return json  with response
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
            'message' => 'User updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // delete the user with the specified id
        $id = $request->id;
        dd($id);
        User::destroy($id);
        // return json with response
        return Inertia::render('Users/Index', [
            'message' => 'User deleted successfully'
        ]);
    }
}
