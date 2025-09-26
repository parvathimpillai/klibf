<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    protected $table = 'user_profiles';

    protected $fillable = [
        'user_id',
        'org_name',
        'estb_year',
        'reg_no',
        'gst_no',
        'book_lang',
        'title_no',
        'org_nature',
        'mgr_house_name',
        'head_org_name',
        'head_org_addr',
        'head_org_mobile',
        'head_org_email',
        'head_org_website',
        'cntct_prsn_name',
        'cntct_prsn_addr',
        'cntct_prsn_mobile',
        'cntct_prsn_email',
        'cntct_prsn_watsapp',
        'fascia',
        'remarks',
        'logo',
        'submitted'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
