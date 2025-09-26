<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminRegister extends Component
{
    public $name;
    public $email;
    public $phone;
    public $password;
    public $password_confirmation;

    public function register()
    {
        $validatedData = Validator::make(
            [
                'name' => $this->name,
                'email' => $this->email,
                'phone' => $this->phone,
                'password' => $this->password,
                'password_confirmation' => $this->password_confirmation,
            ],
            [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required|string|max:20',
                'password' => 'required|string|confirmed|min:6',
            ]
        )->validate();

        // Create the admin user
        User::create([
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'password' => Hash::make($this->password),
            // Optionally, add a role flag
            // 'is_admin' => true,
        ]);

        session()->flash('success', 'Admin registered successfully!');

        // Redirect to login page
        return redirect()->to('/admin/login');
    }

    public function render()
    {
        return view('livewire.admin-register');
    }
}
