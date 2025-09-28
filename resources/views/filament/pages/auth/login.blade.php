@vite(['resources/css/app.css'])
<x-filament-panels::page.simple>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-zinc-900 dark:ring-zinc-800">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF2D20]/10">
                <svg class="h-6 w-6 text-[#FF2D20]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h2 class="text-center text-2xl font-semibold text-black dark:text-white mb-6">Sign in to your account</h2>

            <form wire:submit="authenticate" class="space-y-6">
                {{ $this->form }}

                <x-filament::button
                    type="submit"
                    class="w-full justify-center bg-[#FF2D20] hover:bg-[#e0241c] focus:ring-[#FF2D20]"
                    wire:loading.attr="disabled"
                >
                    <span wire:loading.remove>Sign in</span>
                    <span wire:loading>Signing in...</span>
                </x-filament::button>

                <div class="text-center space-y-2 text-sm">
                    @if (method_exists($this, 'getForgotPasswordUrl'))
                        <a href="{{ $this->getForgotPasswordUrl() }}" class="text-[#FF2D20] hover:underline block">Forgot your password?</a>
                    @endif
                    @if (filament()->hasRegistration())
                        <a href="{{ route('filament.admin.auth.register') }}" class="text-[#FF2D20] hover:underline block">Don't have an account? Register</a>
                    @endif
                </div>
            </form>
        </div>
    </div>
</x-filament-panels::page.simple>
