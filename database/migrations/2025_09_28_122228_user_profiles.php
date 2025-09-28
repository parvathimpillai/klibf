<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('org_name');
            $table->string('estb_year')->nullable();
            $table->string('reg_no')->nullable();
            $table->string('gst_no')->nullable();
            $table->string('book_lang')->nullable();
            $table->integer('title_no')->nullable();
            $table->enum('org_nature', ['P', 'D']); // Publisher / Publisher & Distributor
            $table->string('major_house_name')->nullable();
            $table->text('org_addr')->nullable();
            $table->string('org_mobile');
            $table->string('org_email');
            $table->string('org_website')->nullable();
            $table->string('cntct_prsn_name');
            $table->string('cntct_prsn_desig')->nullable();
            $table->string('cntct_prsn_mobile');
            $table->string('cntct_prsn_email');
            $table->string('cntct_prsn_whatsapp');
            $table->string('fascia');
            $table->text('remarks')->nullable();
            $table->string('logo')->nullable(); // path to file
            $table->boolean('submitted')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
