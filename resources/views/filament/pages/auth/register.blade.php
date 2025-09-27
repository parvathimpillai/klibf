@vite(['resources/css/app.css'])
<x-filament-panels::page.simple>
    <div
        class="min-h-screen flex items-center justify-center bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-zinc-900 dark:ring-zinc-800">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF2D20]/10">
                <svg class="h-6 w-6 text-[#FF2D20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            </div>
            <h2 class="text-center text-2xl font-semibold text-black dark:text-white mb-6">Create your account</h2>

            <form wire:submit="register" class="space-y-6">
                {{ $this->form }}

                <x-filament::button type="submit"
                    class="w-full justify-center bg-[#FF2D20] hover:bg-[#e0241c] focus:ring-[#FF2D20]"
                    wire:loading.attr="disabled">
                    <span wire:loading.remove>Create account</span>
                    <span wire:loading>Creating...</span>
                </x-filament::button>

                <div class="text-center text-sm">
                    <a href="{{ route('filament.admin.auth.login') }}"
                        class="text-[#FF2D20] hover:underline block">Already have an account? Sign in</a>
                </div>
            </form>
        </div>
    </div>
</x-filament-panels::page.simple>
