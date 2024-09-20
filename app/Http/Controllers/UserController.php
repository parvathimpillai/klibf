<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\User\UserResource;
use Illuminate\Support\Facades\Redirect;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all()->pluck('name');
        // return all users paqginated with 10 users per page
        return Inertia::render(
            'Users/Index',
            [
                'users' => UserResource::collection(User::paginate(10)),
                'roles' => $roles
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|exists:roles,name',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return Inertia::render('Users/Index', [
            'users' => UserResource::collection(User::paginate(10)),
            'roles' => Role::all()->pluck('name'),
            'message' => 'User ' . $user->name . ' created successfully'
        ]);
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
        // get the id parameter from the request
        $id = $request->id;

        User::destroy($id);
        // return json with response
        // redirect to route('users.index'); whit message and render inertia page
        return Redirect::route('users.index', ['message' => 'User deleted successfully']);
    }

    /**
     * Find a user by ID.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function findById($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user)
        ]);
    }
}
