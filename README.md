# Laravel Shadcn Starter Kit with Inertia.js

## Introduction
The Laravel Shadcn Starter Kit with Inertia.js is a powerful boilerplate for building modern web applications using the Laravel framework, Shadcn UI components, and Inertia.js for seamless client-side navigation. This kit provides a robust foundation for developers to create dynamic, single-page applications with ease.

## Features
- **Laravel Framework**: Utilizes the latest version of Laravel for a solid backend.
- **Shadcn UI**: A collection of customizable UI components for a modern user interface.
- **Inertia.js**: Enables single-page application (SPA) behavior without the complexity of a full frontend framework.
- **Authentication**: Built-in user authentication and authorization features.
- **Database Migrations**: Easy database management with migrations.
- **API Support**: Ready-to-use API routes for building RESTful services.

## Installation
To get started with the Laravel Shadcn Starter Kit with Inertia.js, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/laravel-shadcn-inertia-starter-kit.git
   ```

2. Navigate to the project directory:
   ```bash
   cd laravel-shadcn-inertia-starter-kit
   ```

3. Install PHP dependencies:
   ```bash
   composer install
   ```

4. Install JavaScript dependencies:
   ```bash
   npm install
   ```

5. Set up your environment file:
   ```bash
   cp .env.example .env
   ```

6. Generate the application key:
   ```bash
   php artisan key:generate
   ```

7. Run the migrations:
   ```bash
   php artisan migrate
   ```

8. Start the development server:
   ```bash
   php artisan serve
   ```

9. Compile your assets:
   ```bash
   npm run dev
   ```


## Usage
Once the installation is complete, you can access your application at `http://localhost:8000`. You can start building your application by creating new routes, controllers, and views using Inertia.js and Shadcn components.

## License
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
